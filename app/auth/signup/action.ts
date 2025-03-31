"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

export async function signup(formData: FormData) {
  const supabase = await createClient();

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    options: {
      data: {
        name: formData.get("name") as string,
        role: formData.get("role") as string,
        location: formData.get("location") as string,
        farm_size: formData.get("farm-size") as string,
        soil_type: formData.get("soil-type") as string,
        primary_crop: formData.get("primary-crop") as string,
      },
    },
  };

  console.log(data);

  const { error } = await supabase.auth.signUp(data);

  if (error) {
    redirect("/error?error=" + error.message);
  }

  revalidatePath("/", "layout");
  redirect("/");
}
