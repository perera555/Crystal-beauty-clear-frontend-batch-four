import { createClient } from "@supabase/supabase-js";

export default function MediaUpload(file) {

     const supabase = createClient("https://uscibyluognuwlsqkvll.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVzY2lieWx1b2dudXdsc3FrdmxsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIxOTYxMTksImV4cCI6MjA4Nzc3MjExOX0.m7ZWIqsEPH-bsl_rc71RLSoI_AQ9h71zdzE9nOh-214")

     const promise = new Promise(
        (resolve, reject) => {
            if(file == null){
                reject("No file selected");
            }
            const timeStamp = new Date().getTime();
            const newFileName = timeStamp + file.name;
            supabase.storage.from("images").upload(newFileName, file, {
                cacheControl: "3600",
                upsert: false
            })
                .then(response => {
                    const url = supabase.storage.from("images").getPublicUrl(newFileName).data.publicUrl;
                    resolve(url);
                })
                .catch(error => {
                    console.log(error)
                    reject("Error uploading file:", error);
                });

     });
        return promise;

}
 