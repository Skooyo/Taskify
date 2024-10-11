"use client";

import React from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from 'next/link';

const formSchema = z.object({
  username: z.string().min(1, { message: "Username is required" }),
  securityQuestion1: z.string().min(1, { message: "Answer is required" }),
  securityQuestion2: z.string().min(1, { message: "Answer is required" }),
  securityQuestion3: z.string().min(1, { message: "Answer is required" }),
});

type FormValues = z.infer<typeof formSchema>;