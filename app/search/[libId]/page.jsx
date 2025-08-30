"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/services/supabase";
import Header from "./_components/Header";
import DisplayResult from "./_components/DisplayResult";


function SearchQueryResult() {
  const params = useParams();
  const libId = params.libId;
  const [searchInputRecord, setSearchInputRecord] = useState();

  //   console.log(libId);
  useEffect(() => {
    GetSearchQueryResult();
  }, []);

  const GetSearchQueryResult = async () => {
    let { data: Library, error } = await supabase.from("Library").select("*").eq("libId", libId);
    console.log(Library[0])
    setSearchInputRecord(Library[0])

  };
  return (<div className="flex flex-col gap-4">
    <Header searchInputRecord={searchInputRecord}/>
    <div className="px-10 md:px-20 lg:px-36 xl:px-56 mt-8">
      <DisplayResult searchInputRecord={searchInputRecord}/>
    </div>
  </div>);
}

export default SearchQueryResult;
