"use client";
import { useCallback, useEffect, useState } from "react";
import { Database } from "@/../types/supabase";
import {
  Session,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { Card, CardBody, CardHeader, Divider } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import { Input } from "@nextui-org/react";

export default function AccountForm({ session }: { session: Session | null }) {
  const supabase = createClientComponentClient<Database>();
  const [loading, setLoading] = useState(true);
  const [fullname, setFullname] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const user = session?.user;

  const getProfile = useCallback(async () => {
    try {
      setLoading(true);

      const { data, error, status } = await supabase
        .from("profiles")
        .select(`full_name, username`)
        .eq("id", user?.id as string)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setFullname(data.full_name);
        setUsername(data.username);
      }
    } catch (error:any) {
      alert("Error loading user data!" + error.message);
    } finally {
      setLoading(false);
    }
  }, [user, supabase]);

  useEffect(() => {
    getProfile();
  }, [user, getProfile]);

  async function updateProfile({
    username,
  }: {
    username: string | null;
    fullname: string | null;
  }) {
    try {
      setLoading(true);

      const { error } = await supabase.from("profiles").upsert({
        id: user?.id as string,
        full_name: fullname,
        username,
        updated_at: new Date().toISOString(),
      });
      if (error) throw error;
      alert("Profile updated!");
    } catch (error :any) {
      alert("Error updating the data!" + error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="max-w-[400px] m-4">
      <CardHeader className="flex gap-3">
        <div className="flex flex-col">
          <p className="text-md">Account</p>
          <p className="text-small text-default-500">
            Update your account or sign out.
          </p>
        </div>
      </CardHeader>
      <Divider />
      <CardBody>
        <div className="form-widget">
          <div className="flex w-full flex-wrap md:flex-nowrap gap-4 mt-2">
            <Input type="email" label="Email" id="email" value={session?.user.email} />
          </div>

          <div className="flex w-full flex-wrap md:flex-nowrap gap-4 mt-4">
            <Input id="fullName"
            label="Full Name"
              type="text"
              value={fullname || ""}
              onChange={(e) => setFullname(e.target.value)} />
          </div>

          <div className="flex w-full flex-wrap md:flex-nowrap gap-4 mt-4">
            <Input id="fullName"
            label="Username"
            type="text"
            value={username || ""}
            onChange={(e) => setUsername(e.target.value)} />
          </div>

          <div className="flex gap-4 mt-4">
          <div>
            <Button
              color="default"
              onClick={() => updateProfile({ fullname, username })}
              disabled={loading}
            >
              {loading ? "Loading ..." : "Update"}
            </Button>
          </div>

          <div>
            <form action="/auth/signout" method="post">
              <Button type="submit" color="danger">
                Sign out
              </Button>
            </form>
          </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
