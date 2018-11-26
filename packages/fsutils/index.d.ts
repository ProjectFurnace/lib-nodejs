export function exists(file: string): boolean;
export function mkdir(dir: string): void;
export function rimraf(file: string): void;
export function createTempDirectory(): string;
export function createTempPath(): string;
export function cp(src: string, dest: string): void;
export function writeFile(file: string, contents: string): void;
export function listDirectory(dir: string): string[];
export function stat(file: string): any;