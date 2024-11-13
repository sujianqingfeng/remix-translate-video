import { exec as nodeExec } from 'node:child_process'
import { promisify } from 'node:util'

const exec = promisify(nodeExec)

type ExecResult = {
	stdout: string
	stderr: string
}

/**
 * 执行命令行命令
 * @param command 要执行的命令
 * @param options 执行选项
 * @returns Promise<ExecResult>
 */
export async function execCommand(
	command: string,
	options: { cwd?: string } = {},
): Promise<ExecResult> {
	try {
		const { stdout, stderr } = await exec(command, {
			cwd: options.cwd || process.cwd(),
		})
		return {
			stdout: stdout.trim(),
			stderr: stderr.trim(),
		}
	} catch (error: unknown) {
		if (error instanceof Error) {
			throw new Error(`命令执行失败: ${error.message}`)
		}
		throw new Error('命令执行失败: 未知错误')
	}
}
