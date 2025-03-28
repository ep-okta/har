import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HarRequest } from "./harTypes";

interface ResponseTabProps {
  request: HarRequest;
}

export function ResponseTab({ request }: ResponseTabProps) {
  const { response } = request;

  // Determine if content can be displayed as text
  const canDisplayAsText = (content: { mimeType: string; text?: string }) => {
    if (!content.text) return false;

    const textBasedTypes = [
      "text/",
      "application/json",
      "application/xml",
      "application/javascript",
      "application/x-javascript",
      "application/ecmascript",
      "application/x-ecmascript",
      "application/ld+json",
      "application/html",
    ];

    return textBasedTypes.some((type) =>
      content.mimeType.toLowerCase().includes(type),
    );
  };

  return (
    <Accordion
      type="multiple"
      className="w-full"
      defaultValue={["content", "headers"]}
    >
      <AccordionItem value="content">
        <AccordionTrigger>Response Content</AccordionTrigger>
        <AccordionContent>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h4 className="text-sm text-emerald-600 dark:text-emerald-500">
                MIME Type
              </h4>
              <div className="font-mono text-sm">
                {response.content.mimeType}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <h4 className="text-sm text-emerald-600 dark:text-emerald-500">
                Size
              </h4>
              <div className="font-mono text-sm">
                {response.content.size} bytes
              </div>
            </div>

            <div className="mt-4">
              <h4 className="text-sm text-emerald-600 dark:text-emerald-500 mb-2">
                Content
              </h4>
              {canDisplayAsText(response.content) ? (
                <pre className="font-mono text-sm p-2 bg-gray-50 dark:bg-gray-900 rounded border border-gray-200 dark:border-gray-800 overflow-x-auto whitespace-pre-wrap break-words max-h-96 overflow-y-auto">
                  {response.content.text}
                </pre>
              ) : (
                <div className="text-sm text-gray-600 dark:text-gray-400 italic">
                  {response.content.text
                    ? "Content cannot be displayed (binary or unsupported format)"
                    : "No content available"}
                </div>
              )}
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="headers">
        <AccordionTrigger>Response Headers</AccordionTrigger>
        <AccordionContent>
          <div className="space-y-1">
            {response.headers.map((header) => (
              <div key={header.name} className="font-mono text-sm">
                <span className="text-emerald-600 dark:text-emerald-500">
                  {header.name}
                </span>
                <span className="text-gray-600 dark:text-gray-400 ml-2">
                  {header.value}
                </span>
              </div>
            ))}
            {response.headers.length === 0 && (
              <div className="text-sm text-gray-600 dark:text-gray-400">
                No headers found
              </div>
            )}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
