"use client";
import axios from "axios";
import * as z from "zod";
import Heading from "@/components/Heading";
import { Clipboard, Code, Sparkles } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema } from "./constants";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { ChatCompletionRequestMessage } from "openai";
import Empty from "@/components/Empty";
import Loader from "@/components/Loader";
import UserAvatar from "@/components/UserAvatar";
import BotAvatar from "@/components/BotAvatar";
import { cn } from "@/lib/utils";
import ReactMarkdown from "react-markdown";
import { useProModalStore } from "@/store/useProModalStore";
import toast from "react-hot-toast";

export default function CodePage() {
  const router = useRouter();
  const proModal = useProModalStore();
  const preRef = useRef<HTMLDivElement | null>(null);
  const [messages, setMessages] = useState<ChatCompletionRequestMessage[]>([]);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const userMessage: ChatCompletionRequestMessage = {
        role: "user",
        content: values.prompt,
      };
      const newMessages = [...messages, userMessage];

      const response = await axios.post("/api/code", {
        messages: newMessages,
      });

      setMessages((current) => [...current, userMessage, response.data]);

      form.reset();
    } catch (error: any) {
      if (error?.response?.status === 403) {
        proModal.onOpen();
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      router.refresh();
    }
  };

  const handleCopyClick = () => {
    if (preRef.current) {
      const content = preRef.current.innerText;
      navigator.clipboard.writeText(content);
    }
  };

  return (
    <div>
      <Heading
        title="Code Generation"
        description="Our most recent code model"
        icon={Code}
        iconColor="text-green-700"
        bgColor="bg-green-50"
      />
      <div className="px-4 lg:px-8">
        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="rounded-lg border-border border w-full p-4 px-3 
              md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2"
            >
              <FormField
                name="prompt"
                render={({ field }) => (
                  <FormItem className="col-span-12 xl:col-span-10">
                    <FormControl className="m-0 p-0">
                      <Input
                        className="border-0 outline-none focus-visible:ring-0 
                      focus-visible:ring-transparent"
                        disabled={isLoading}
                        placeholder="How do I make an HTTP request in Javascript?"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button
                className="col-span-12 xl:col-span-2"
                disabled={isLoading}
              >
                <Sparkles className="w-4 h-4 mr-2 fill-white" />
                Generate
              </Button>
            </form>
          </Form>
        </div>
        <div className="space-y-4 mt-4">
          {isLoading && (
            <div className="flex justify-center items-center w-full bg-muted rounded-lg p-8 animate-pulse">
              <Loader className="bg-green-700" />
            </div>
          )}
          {messages.length === 0 && !isLoading && (
            <Empty label="Empty Conversation" />
          )}
          <div className="flex flex-col-reverse gap-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={cn(
                  "p-8 w-full flex  items-start gap-x-8 rounded-lg",
                  message.role === "user"
                    ? "border border-border flex-row-reverse"
                    : "bg-muted"
                )}
              >
                {message.role === "user" ? <UserAvatar /> : <BotAvatar />}
                <ReactMarkdown
                  components={{
                    pre: ({ node, ...props }) => (
                      <>
                        <div className="overflow-auto w-full my-4 bg-foreground text-muted-foreground rounded-lg">
                          <div className="flex justify-end bg-primary">
                            <button
                              onClick={handleCopyClick}
                              className="text-xs p-2 text-muted/80 gap-1 items-center flex"
                            >
                              <Clipboard size={16} />
                              Copy code
                            </button>
                          </div>
                          <div ref={preRef} className="p-2">
                            <pre {...props} />
                          </div>
                        </div>
                      </>
                    ),
                    code: ({ node, ...props }) => (
                      <code
                        className="bg-foreground text-muted-foreground rounded-lg p-1"
                        {...props}
                      />
                    ),
                  }}
                  className="text-sm overflow-hidden leading-7"
                >
                  {message?.content || ""}
                </ReactMarkdown>
              </div>
            ))}
            <div className="mt-4 text-center"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
