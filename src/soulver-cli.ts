import { exec, execFile } from 'node:child_process';
import { promisify } from 'node:util';

const execAsync = promisify(exec);
const execFileAsync = promisify(execFile);

/**
 * Execute a mathematical expression using the Soulver CLI
 * @param expression - Natural language mathematical expression
 * @returns Promise resolving to the calculated result
 * @throws Error if CLI is not installed, expression is invalid, or execution fails
 */
export async function executeSoulverExpression(expression: string): Promise<string> {
  try {
    // Validate input
    if (!expression || expression.trim().length === 0) {
      throw new Error("Expression cannot be empty");
    }

    // Pass the expression as a discrete argument (no shell involved) so
    // shell metacharacters and $1-$9 style positional parameters in the
    // expression can't be interpreted or expanded.
    const { stdout, stderr } = await execFileAsync('soulver', [expression], {
      timeout: 10000, // 10 second timeout
      encoding: 'utf8',
      maxBuffer: 1024 * 1024 // 1MB buffer limit
    });

    if (stderr && stderr.trim().length > 0) {
      throw new Error(`Soulver CLI error: ${stderr.trim()}`);
    }

    const result = stdout.trim();
    
    if (!result) {
      throw new Error("Soulver CLI returned empty result");
    }

    return result;
  } catch (error: any) {
    // Handle specific error cases
    if (error.code === 'ENOENT') {
      throw new Error("Soulver CLI not found. Please install with: brew install soulver-cli");
    }
    
    if (error.signal === 'SIGTERM') {
      throw new Error("Expression evaluation timed out (10 seconds)");
    }
    
    if (error.code === 'EMSGSIZE') {
      throw new Error("Expression result too large");
    }
    
    // Re-throw with original message if it's already a proper error
    if (error.message) {
      throw error;
    }
    
    // Fallback for unknown errors
    throw new Error(`Unexpected error evaluating expression: ${String(error)}`);
  }
}

/**
 * Check if Soulver CLI is installed and accessible
 * @returns Promise resolving to true if CLI is available, false otherwise
 */
export async function checkSoulverCLI(): Promise<boolean> {
  try {
    await execAsync('which soulver', { timeout: 5000 });
    return true;
  } catch {
    return false;
  }
}

/**
 * Get Soulver CLI version information
 * @returns Promise resolving to version string or null if not available
 */
export async function getSoulverCLIVersion(): Promise<string | null> {
  try {
    const { stdout } = await execAsync('soulver --version', { 
      timeout: 5000,
      encoding: 'utf8'
    });
    return stdout.trim();
  } catch {
    return null;
  }
}
