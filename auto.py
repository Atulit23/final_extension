import requests
from bs4 import BeautifulSoup
import pdfkit
import fitz  # PyMuPDF library for extracting text from PDF

def get_html(url):
    response = requests.get(url)
    return response.text

def save_pdf(html_content, pdf_path):
    pdfkit.from_file(html_content, pdf_path)

def extract_text_from_pdf(pdf_path):
    doc = fitz.open(pdf_path)
    text = ""
    for page_num in range(doc.page_count):
        page = doc[page_num]
        text += page.get_text()
    return text

def main():
    url = "https://www.linkedin.com/pulse/dark-patterns-ultimate-conversion-blocker-ecommerce-jon-macdonald/"
    html_content = get_html(url)
    pdf_path = "output.pdf"

    save_pdf(html_content, pdf_path)
    extracted_text = extract_text_from_pdf(pdf_path)

    print("Extracted Text:")
    print(extracted_text)

if __name__ == "__main__":
    main()
