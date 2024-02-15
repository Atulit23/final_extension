import requests

API_URL = "https://api-inference.huggingface.co/models/google/flan-t5-large"
headers = {"Authorization": "Bearer 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"}

def query(payload):
	response = requests.post(API_URL, headers=headers, json=payload)
	return response.json()
	
output = query({
	"inputs": '''You may decide to cancel your Account whenever you want, at your sole discretion.

We may do the same, and we reserve the right to suspend or terminate your access to the Services anytime with or without cause, and at our own discretion, with or without notice.

Upon cancellation of your Account, we will use commercially reasonable efforts to delete your information and Content of your own Repositories, whether public or private, within 90 days. We will not delete the Content that you contributed to other Users' Repositories, or copies made by us or other Users.

We also reserve the right to retain your information for legal or regulatory compliance, pursuant to standard archiving, recovery, and back-up processes and practices, and pursuant to our Privacy Policy.

For certain Services, the Service Term and causes for termination may be specified in the Supplemental Terms and/or in any other binding document signed between us, including but not limited to an Order Form, a Scope of Work, or a Master Service Agreement, which are fully incorporated into the Agreement between us.

Are the terms of cancellation clear? Answer in yes or no.
 ''',
})

print(output)