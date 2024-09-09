"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

// import { toast } from "@/components/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Tag } from "@/types";

const FormSchema = z.object({
  items: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one item.",
  }),
});

type TagCheckBoxProps = {
  tags: Tag[];
  checkedTags: Tag[];
  setCheckedTags: (tags: Tag[]) => void;
};

const TagCheckBox = ({
  tags,
  checkedTags,
  setCheckedTags,
}: TagCheckBoxProps) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      items: [],
    },
  });

  const handleCheckedChange = (tag: Tag, checked: string | boolean) => {
    setCheckedTags(
      checked
        ? [...checkedTags, tag]
        : checkedTags.filter((checkedTag) => checkedTag !== tag),
    );
  };

  return (
    <Form {...form}>
      <FormField
        control={form.control}
        name="items"
        render={() => (
          <FormItem>
            {tags.map((tag) => (
              <FormField
                key={tag.name}
                control={form.control}
                name="items"
                render={({ field }) => {
                  return (
                    <FormItem
                      key={tag.name}
                      className="flex flex-row items-start space-x-3 space-y-0"
                    >
                      <label className="flex flex-row items-center space-x-3 cursor-pointer w-full">
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(tag.name)}
                            onCheckedChange={(checked) => {
                              handleCheckedChange(tag, checked);
                              return checked
                                ? field.onChange([...field.value, tag.name])
                                : field.onChange(
                                    field.value?.filter(
                                      (value) => value !== tag.name,
                                    ),
                                  );
                            }}
                          />
                        </FormControl>
                        <FormLabel className="font-normal cursor-pointer">
                          {tag.name}
                        </FormLabel>
                      </label>
                    </FormItem>
                  );
                }}
              />
            ))}
            <FormMessage />
          </FormItem>
        )}
      />
    </Form>
  );
};

export default TagCheckBox;
