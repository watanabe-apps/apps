import urllib.request
import json
import base64
import sys
import os
import time

def generate_image(prompt, negative_prompt="", width=1024, height=1024, steps=4, seed=-1, output_path="output.png"):
    url = "http://127.0.0.1:7860/sdapi/v1/txt2img"
    
    payload = {
        "prompt": prompt,
        "negative_prompt": negative_prompt,
        "width": width,
        "height": height,
        "steps": steps,
        "seed": seed,
    }
    
    req = urllib.request.Request(
        url,
        data=json.dumps(payload).encode("utf-8"),
        headers={"Content-Type": "application/json"}
    )
    
    print(f"Sending generation request to Draw Things: '{prompt[:60]}...'")
    start = time.time()
    try:
        with urllib.request.urlopen(req, timeout=300) as response:
            res_data = json.loads(response.read().decode("utf-8"))
            images = res_data.get("images", [])
            if not images:
                print("Error: No images returned from Draw Things API.")
                return False
            
            # decode first image
            img_b64 = images[0]
            if "," in img_b64:
                img_b64 = img_b64.split(",")[1]
            
            os.makedirs(os.path.dirname(os.path.abspath(output_path)), exist_ok=True)
            with open(output_path, "wb") as f:
                f.write(base64.b64decode(img_b64))
            
            elapsed = time.time() - start
            print(f"Success! Image saved to {output_path} (took {elapsed:.1f}s)")
            return True
    except Exception as e:
        print(f"Failed to generate image: {e}")
        return False

if __name__ == "__main__":
    prompt = sys.argv[1] if len(sys.argv) > 1 else "Cute orange tabby cat wearing a tiny chef hat, cooking pancakes in a cozy kitchen, watercolor picture book illustration"
    output = sys.argv[2] if len(sys.argv) > 2 else "/Users/watanabetatsuki/Documents/GitHub/apps/generated_test.png"
    generate_image(prompt=prompt, output_path=output)

