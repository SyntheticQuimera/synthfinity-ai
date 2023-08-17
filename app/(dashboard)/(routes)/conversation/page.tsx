"use client";
import axios from "axios";
import * as z from "zod";
import Heading from "@/components/Heading";
import { MessagesSquare, Sparkles } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema } from "./constants";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ChatCompletionRequestMessage } from "openai";
import Empty from "@/components/Empty";
import Loader from "@/components/Loader";
import UserAvatar from "@/components/UserAvatar";
import BotAvatar from "@/components/BotAvatar";
import { cn } from "@/lib/utils";
import { useProModalStore } from "@/store/useProModalStore";
import toast from "react-hot-toast";

export default function ConversationPage() {
  const router = useRouter();
  const proModal = useProModalStore();
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

      const response = await axios.post("/api/conversation", {
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

  return (
    <div>
      <Heading
        title="Conversation"
        description="Our most recent conversations model"
        icon={MessagesSquare}
        iconColor="text-violet-500"
        bgColor="bg-violet-50"
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
                        placeholder="Explain quantum computing in simple terms"
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
              <Loader className="bg-violet-500" />
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
                <p
                  className="text-sm"
                  dangerouslySetInnerHTML={{
                    __html: message?.content?.replace(
                      /\n/g,
                      "<br />"
                    ) as string,
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
