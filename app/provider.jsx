"use client";
import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { supabase } from "@/services/supabase";
import { UserDetailContext } from "@/context/UserDetailContext";

function Provider({ children }) {
  const { user } = useUser();
  const [userDetails, setUserDetails] = useState();
  useEffect(() => {
    user && CreateNewUser();
  }, [user]);

  const CreateNewUser = async () => {
    //if user exists
    let { data: Users, error } = await supabase
      .from("Users")
      .select("*")
      .eq("email", user?.primaryEmailAddress.emailAddress);

    // console.log(Users);

    if (Users.length == 0) {
      const { data, error } = await supabase
        .from("Users")
        .insert([
          {
            email: user?.primaryEmailAddress.emailAddress,
            name: user?.fullName,
          },
        ])
        .select();
    //   console.log(data);
      setUserDetails(data[0]);
      return;
    }
    setUserDetails(Users[0]);
  };

  return (
    <UserDetailContext.Provider value={{ userDetails, setUserDetails }}>
          <div className="w-full">{children}</div>
    </UserDetailContext.Provider>
)
}

export default Provider;
