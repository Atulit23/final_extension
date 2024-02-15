import { client } from "@gradio/client";

const app = await client("https://atulit23-google-flan-t5.hf.space/");
const result = await app.predict("/predict", [		
				"If you signed-up for your video-only subscription or membership directly through us, you may cancel any time by visiting Your Account and adjusting your membership settings, by contacting Amazon customer service, or by using any cancellation form that we make available to you or, if you transact for the applicable Amazon subscription or membership service through a third party, through your account with such third party. If you cancel within 3 business days of signing up for, or converting from a free trial to, a paid membership, we will refund your full membership fee; except that we may charge you (or withhold from your refund) the value of the Service used through your account during such period. ", 
	]);

console.log(result.data[0].includes("no"))