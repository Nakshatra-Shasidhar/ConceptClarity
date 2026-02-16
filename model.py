from transformers import pipeline

generator = pipeline("text-generation", model="gpt2")

def generate_text(prompt):
    result = generator(prompt, max_length=150)
    return result[0]["generated_text"]
