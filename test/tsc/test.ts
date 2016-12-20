import * as ts from "typescript/lib/typescript";
import * as fs from "fs";
import * as path from "path";
import * as glob from "glob";
import * as assert from "power-assert";

function getExpectedErrors(file: string): string[] {
    // Get lines beginning from "////" as expected errors.
    // Check last line only of each errors.
    const lines = fs.readFileSync(file).toString().replace(/\r\n/g, "\n").split("\n");
    return lines.filter(l => l.startsWith("////")).map(l => l.substring(4).trim()).filter(l => l.length > 0);
}

describe("tsc compilation tests", function() {
    const compilerOptions: ts.CompilerOptions = {
        module: ts.ModuleKind.CommonJS,
        target: ts.ScriptTarget.ES5,
        noEmitOnError: true,
        experimentalDecorators: true,
        lib: ["dom", "es2015"]
    };
    const files = glob.sync("test/tsc/cases/*.ts");
    const host: ts.LanguageServiceHost = {
        getScriptFileNames: () => files,
        getScriptVersion: f => "0",
        getScriptSnapshot: f => {
            if (!fs.existsSync(f)) {
                return undefined;
            }
            return ts.ScriptSnapshot.fromString(fs.readFileSync(f).toString());
        },
        getCurrentDirectory: () => process.cwd(),
        getCompilationSettings: () => compilerOptions,
        getDefaultLibFileName: options => ts.getDefaultLibFileName(options),
    };
    const service = ts.createLanguageService(host, ts.createDocumentRegistry());
    files.forEach(f => {
        if (f.endsWith(".d.ts")) {
            return;
        }
        const filename = path.basename(f);
        it(filename, function() {
            const output = service.getEmitOutput(f);
            const messages = service.getSemanticDiagnostics(f).map(d => {
                return (ts.flattenDiagnosticMessageText(d.messageText, "\n").split(/\n/g).pop() || "").trim();
            });
            const expectedErrors = getExpectedErrors(f);
            assert(messages.length === expectedErrors.length);
            messages.forEach((message, i) => {
                const expected = expectedErrors[i];
                assert(message === expected);
            });
        });
    });
});

