'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useEffect, useState } from 'react';
import { SearchCheckIcon, SearchIcon } from 'lucide-react';

const FormSchema = z.object({
  search: z.string(),
});

interface ISearch {
  setSearch: (value: string) => void;
}

export const Search: React.FC<ISearch> = ({ setSearch }) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      search: '',
    },
  });

  const [timeoutId, setTimeoutId] = useState<number | undefined>(undefined);

  useEffect(() => {
    const handleInputChange = () => {
      clearTimeout(timeoutId);

      const newTimeoutId: any = setTimeout(() => {
        // console.log(form.getValues());
        setSearch(form.getValues().search);
      }, 2000);

      setTimeoutId(newTimeoutId);
    };

    form.watch(handleInputChange);

    return () => clearTimeout(timeoutId);
  }, [form]);

  function onSubmit(data: z.infer<typeof FormSchema>) {
    setSearch(data.search);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-1/3 my-4 flex items-center relative"
      >
        <FormField
          control={form.control}
          name="search"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Input className="" placeholder="search" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="absolute right-0" type="submit">
          <SearchIcon size={20} />
        </Button>
      </form>
    </Form>
  );
};
