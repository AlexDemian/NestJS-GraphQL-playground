import { promises as fs } from 'fs';
import { Injectable, Scope, ConsoleLogger } from '@nestjs/common';

@Injectable({ scope: Scope.TRANSIENT })
export class LoggerService extends ConsoleLogger {
	writeToFile(message: string) {
		return fs.appendFile('logs/all.log', new Date() + ':' + message + '\r\n');
	}

	debug(message: string, trace?: string) {
		super.debug(message, trace);
		return this.writeToFile(message);
	}

	error(message: string, trace?: string) {
		super.error(message, trace);
		return this.writeToFile(message);
	}

	log(message: string, trace?: string) {
		super.log(message, trace);
		return this.writeToFile(message);
	}

	verbose(message: string, trace?: string) {
		super.verbose(message, trace);
		return this.writeToFile(message);
	}

	warn(message: string, trace?: string) {
		super.warn(message, trace);
		return this.writeToFile(message);
	}
}
