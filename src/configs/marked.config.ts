import { marked } from 'marked';
import { markedTerminal } from 'marked-terminal';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
marked.use(markedTerminal());

export { marked };
