#!/usr/bin/env python3
"""
add_hito_category.py - Adds the 'hito' (people/family/jobs/characters) category to common/vocab.js
"""

import json
import re
import os

VOCAB_JS_PATH = "/Users/watanabetatsuki/Documents/GitHub/apps/common/vocab.js"

hito_words = [
    # 1. かぞく・みぢかなひと (15語)
    {
        "id": "h_watashi",
        "name": "わたし",
        "category": "hito",
        "categoryName": "ひと",
        "image": "images/h_watashi.png",
        "file": "h_watashi.png",
        "prompt": "Japanese picture book watercolor illustration of a cute young child pointing happily at oneself smiling (わたし / me, myself), friendly bright eyes, cheerful pose, warm gentle watercolor wash, soft pencil contour, completely isolated on solid pure white background (#ffffff). Absolutely no text, no letters.",
        "tts_text": "わたし",
        "subCategory": "kazoku_hito",
        "subCategoryName": "かぞく・みぢかなひと"
    },
    {
        "id": "h_anata",
        "name": "あなた",
        "category": "hito",
        "categoryName": "ひと",
        "image": "images/h_anata.png",
        "file": "h_anata.png",
        "prompt": "Japanese picture book watercolor illustration of a cute young child gently gesturing or reaching out a friendly hand towards the viewer (あなた / you), warm welcoming smile, gentle watercolor wash, soft pencil contour, completely isolated on solid pure white background (#ffffff). Absolutely no text, no letters.",
        "tts_text": "あなた",
        "subCategory": "kazoku_hito",
        "subCategoryName": "かぞく・みぢかなひと"
    },
    {
        "id": "h_otousan",
        "name": "おとうさん",
        "category": "hito",
        "categoryName": "ひと",
        "image": "images/h_otousan.png",
        "file": "h_otousan.png",
        "prompt": "Japanese picture book watercolor illustration of a kind and gentle young father smiling warmly (おとうさん / father, dad), wearing neat casual clothing, friendly expression, warm watercolor wash, soft pencil contour, completely isolated on solid pure white background (#ffffff). Absolutely no text, no letters.",
        "tts_text": "お父さん",
        "subCategory": "kazoku_hito",
        "subCategoryName": "かぞく・みぢかなひと"
    },
    {
        "id": "h_okaasan",
        "name": "おかあさん",
        "category": "hito",
        "categoryName": "ひと",
        "image": "images/h_okaasan.png",
        "file": "h_okaasan.png",
        "prompt": "Japanese picture book watercolor illustration of a kind and loving young mother with a warm gentle smile (おかあさん / mother, mom), wearing cozy comfortable clothes, affectionate welcoming expression, warm gentle watercolor wash, soft pencil contour, completely isolated on solid pure white background (#ffffff). Absolutely no text, no letters.",
        "tts_text": "お母さん",
        "subCategory": "kazoku_hito",
        "subCategoryName": "かぞく・みぢかなひと"
    },
    {
        "id": "h_akachan",
        "name": "あかちゃん",
        "category": "hito",
        "categoryName": "ひと",
        "image": "images/h_akachan.png",
        "file": "h_akachan.png",
        "prompt": "Japanese picture book watercolor illustration of an adorable chubby baby smiling in a soft pastel romper (あかちゃん / baby), rosy cheeks, innocent curious eyes, warm gentle watercolor wash, soft pencil contour, completely isolated on solid pure white background (#ffffff). Absolutely no text, no letters.",
        "tts_text": "赤ちゃん",
        "subCategory": "kazoku_hito",
        "subCategoryName": "かぞく・みぢかなひと"
    },
    {
        "id": "h_oniisan",
        "name": "おにいさん",
        "category": "hito",
        "categoryName": "ひと",
        "image": "images/h_oniisan.png",
        "file": "h_oniisan.png",
        "prompt": "Japanese picture book watercolor illustration of a cheerful energetic boy or elder brother smiling waving hand (おにいさん / older brother, boy), lively posture, warm gentle watercolor wash, soft pencil contour, completely isolated on solid pure white background (#ffffff). Absolutely no text, no letters.",
        "tts_text": "お兄さん",
        "subCategory": "kazoku_hito",
        "subCategoryName": "かぞく・みぢかなひと"
    },
    {
        "id": "h_oneesan",
        "name": "おねえさん",
        "category": "hito",
        "categoryName": "ひと",
        "image": "images/h_oneesan.png",
        "file": "h_oneesan.png",
        "prompt": "Japanese picture book watercolor illustration of a cheerful friendly girl or elder sister smiling happily (おねえさん / older sister, girl), neat hair, cute pose, warm gentle watercolor wash, soft pencil contour, completely isolated on solid pure white background (#ffffff). Absolutely no text, no letters.",
        "tts_text": "お姉さん",
        "subCategory": "kazoku_hito",
        "subCategoryName": "かぞく・みぢかなひと"
    },
    {
        "id": "h_otouto",
        "name": "おとうと",
        "category": "hito",
        "categoryName": "ひと",
        "image": "images/h_otouto.png",
        "file": "h_otouto.png",
        "prompt": "Japanese picture book watercolor illustration of a cute playful little boy younger brother (おとうと / younger brother, toddler boy), lively smile, warm gentle watercolor wash, soft pencil contour, completely isolated on solid pure white background (#ffffff). Absolutely no text, no letters.",
        "tts_text": "弟",
        "subCategory": "kazoku_hito",
        "subCategoryName": "かぞく・みぢかなひと"
    },
    {
        "id": "h_imouto",
        "name": "いもうと",
        "category": "hito",
        "categoryName": "ひと",
        "image": "images/h_imouto.png",
        "file": "h_imouto.png",
        "prompt": "Japanese picture book watercolor illustration of a cute sweet little girl younger sister with pigtails (いもうと / younger sister, toddler girl), bright smile, warm gentle watercolor wash, soft pencil contour, completely isolated on solid pure white background (#ffffff). Absolutely no text, no letters.",
        "tts_text": "妹",
        "subCategory": "kazoku_hito",
        "subCategoryName": "かぞく・みぢかなひと"
    },
    {
        "id": "h_ojiisan",
        "name": "おじいさん",
        "category": "hito",
        "categoryName": "ひと",
        "image": "images/h_ojiisan.png",
        "file": "h_ojiisan.png",
        "prompt": "Japanese picture book watercolor illustration of a kind elderly grandfather with gentle smiling eyes and neat grey hair (おじいさん / grandfather), wearing cozy cardigan, warm affectionate face, gentle watercolor wash, soft pencil contour, completely isolated on solid pure white background (#ffffff). Absolutely no text, no letters.",
        "tts_text": "お爺さん",
        "subCategory": "kazoku_hito",
        "subCategoryName": "かぞく・みぢかなひと"
    },
    {
        "id": "h_obaasan",
        "name": "おばあさん",
        "category": "hito",
        "categoryName": "ひと",
        "image": "images/h_obaasan.png",
        "file": "h_obaasan.png",
        "prompt": "Japanese picture book watercolor illustration of a warm and gentle elderly grandmother with a kind smile (おばあさん / grandmother), wearing comfortable knitwear, affectionate sweet expression, gentle watercolor wash, soft pencil contour, completely isolated on solid pure white background (#ffffff). Absolutely no text, no letters.",
        "tts_text": "お婆さん",
        "subCategory": "kazoku_hito",
        "subCategoryName": "かぞく・みぢかなひと"
    },
    {
        "id": "h_tomodachi",
        "name": "ともだち",
        "category": "hito",
        "categoryName": "ひと",
        "image": "images/h_tomodachi.png",
        "file": "h_tomodachi.png",
        "prompt": "Japanese picture book watercolor illustration of two cute young children standing happily together with smiles and friendly arms around shoulders (ともだち / friends), heartwarming companionship, warm gentle watercolor wash, soft pencil contour, completely isolated on solid pure white background (#ffffff). Absolutely no text, no letters.",
        "tts_text": "友達",
        "subCategory": "kazoku_hito",
        "subCategoryName": "かぞく・みぢかなひと"
    },
    {
        "id": "h_otokonoko",
        "name": "おとこのこ",
        "category": "hito",
        "categoryName": "ひと",
        "image": "images/h_otokonoko.png",
        "file": "h_otokonoko.png",
        "prompt": "Japanese picture book watercolor illustration of a cute cheerful little boy standing with a bright energetic smile (おとこのこ / young boy), casual T-shirt and shorts, warm gentle watercolor wash, soft pencil contour, completely isolated on solid pure white background (#ffffff). Absolutely no text, no letters.",
        "tts_text": "男の子",
        "subCategory": "kazoku_hito",
        "subCategoryName": "かぞく・みぢかなひと"
    },
    {
        "id": "h_onnanoko",
        "name": "おんなのこ",
        "category": "hito",
        "categoryName": "ひと",
        "image": "images/h_onnanoko.png",
        "file": "h_onnanoko.png",
        "prompt": "Japanese picture book watercolor illustration of a cute cheerful little girl standing with a bright friendly smile (おんなのこ / young girl), wearing a simple cute dress, warm gentle watercolor wash, soft pencil contour, completely isolated on solid pure white background (#ffffff). Absolutely no text, no letters.",
        "tts_text": "女の子",
        "subCategory": "kazoku_hito",
        "subCategoryName": "かぞく・みぢかなひと"
    },
    {
        "id": "h_sensei",
        "name": "せんせい",
        "category": "hito",
        "categoryName": "ひと",
        "image": "images/h_sensei.png",
        "file": "h_sensei.png",
        "prompt": "Japanese picture book watercolor illustration of a kind and smiling kindergarten or preschool teacher holding a picture book (せんせい / teacher, preschool teacher), warm welcoming smile, gentle watercolor wash, soft pencil contour, completely isolated on solid pure white background (#ffffff). Absolutely no text, no letters.",
        "tts_text": "先生",
        "subCategory": "kazoku_hito",
        "subCategoryName": "かぞく・みぢかなひと"
    },

    # 2. おしごと・まちのひと (11語)
    {
        "id": "h_shouboushi",
        "name": "しょうぼうし",
        "category": "hito",
        "categoryName": "ひと",
        "image": "images/h_shouboushi.png",
        "file": "h_shouboushi.png",
        "prompt": "Japanese picture book watercolor illustration of a brave and friendly firefighter in orange firefighter uniform and helmet smiling reliably (しょうぼうし / firefighter), warm gentle watercolor wash, soft pencil contour, completely isolated on solid pure white background (#ffffff). Absolutely no text, no letters.",
        "tts_text": "消防士",
        "subCategory": "oshigoto_hito",
        "subCategoryName": "おしごとのひと"
    },
    {
        "id": "h_keisatsukan",
        "name": "けいさつかん",
        "category": "hito",
        "categoryName": "ひと",
        "image": "images/h_keisatsukan.png",
        "file": "h_keisatsukan.png",
        "prompt": "Japanese picture book watercolor illustration of a polite and friendly police officer in neat blue uniform and cap with a kind smile saluting gently (けいさつかん / police officer), reassuring posture, warm gentle watercolor wash, soft pencil contour, completely isolated on solid pure white background (#ffffff). Absolutely no text, no letters.",
        "tts_text": "警察官",
        "subCategory": "oshigoto_hito",
        "subCategoryName": "おしごとのひと"
    },
    {
        "id": "h_oishasan",
        "name": "おいしゃさん",
        "category": "hito",
        "categoryName": "ひと",
        "image": "images/h_oishasan.png",
        "file": "h_oishasan.png",
        "prompt": "Japanese picture book watercolor illustration of a gentle and friendly doctor wearing a white coat with a stethoscope around neck smiling reassuringly (おいしゃさん / doctor, pediatrician), warm gentle watercolor wash, soft pencil contour, completely isolated on solid pure white background (#ffffff). Absolutely no text, no letters.",
        "tts_text": "お医者さん",
        "subCategory": "oshigoto_hito",
        "subCategoryName": "おしごとのひと"
    },
    {
        "id": "h_kangoshi",
        "name": "かんごし",
        "category": "hito",
        "categoryName": "ひと",
        "image": "images/h_kangoshi.png",
        "file": "h_kangoshi.png",
        "prompt": "Japanese picture book watercolor illustration of a caring and kind nurse in medical scrubs or uniform smiling warmly (かんごし / nurse), compassionate friendly posture, warm gentle watercolor wash, soft pencil contour, completely isolated on solid pure white background (#ffffff). Absolutely no text, no letters.",
        "tts_text": "看護師",
        "subCategory": "oshigoto_hito",
        "subCategoryName": "おしごとのひと"
    },
    {
        "id": "h_haishasan",
        "name": "はいしゃさん",
        "category": "hito",
        "categoryName": "ひと",
        "image": "images/h_haishasan.png",
        "file": "h_haishasan.png",
        "prompt": "Japanese picture book watercolor illustration of a friendly dentist holding a dental mirror with a gentle smile (はいしゃさん / pediatric dentist), reassuring clean white coat, warm gentle watercolor wash, soft pencil contour, completely isolated on solid pure white background (#ffffff). Absolutely no text, no letters.",
        "tts_text": "歯医者さん",
        "subCategory": "oshigoto_hito",
        "subCategoryName": "おしごとのひと"
    },
    {
        "id": "h_kokkusan",
        "name": "コックさん",
        "category": "hito",
        "categoryName": "ひと",
        "image": "images/h_kokkusan.png",
        "file": "h_kokkusan.png",
        "prompt": "Japanese picture book watercolor illustration of a jolly smiling chef in tall white chef hat and apron holding a wooden spoon (コックさん / chef, cook), delicious warm atmosphere, gentle watercolor wash, soft pencil contour, completely isolated on solid pure white background (#ffffff). Absolutely no text, no letters.",
        "tts_text": "コックさん",
        "subCategory": "oshigoto_hito",
        "subCategoryName": "おしごとのひと"
    },
    {
        "id": "h_panyasan",
        "name": "パンやさん",
        "category": "hito",
        "categoryName": "ひと",
        "image": "images/h_panyasan.png",
        "file": "h_panyasan.png",
        "prompt": "Japanese picture book watercolor illustration of a cheerful baker with a flour-dusted apron holding a fresh golden loaf of bread (パンやさん / baker), warm bakery aroma feel, gentle watercolor wash, soft pencil contour, completely isolated on solid pure white background (#ffffff). Absolutely no text, no letters.",
        "tts_text": "パン屋さん",
        "subCategory": "oshigoto_hito",
        "subCategoryName": "おしごとのひと"
    },
    {
        "id": "h_hanayasan",
        "name": "はなやさん",
        "category": "hito",
        "categoryName": "ひと",
        "image": "images/h_hanayasan.png",
        "file": "h_hanayasan.png",
        "prompt": "Japanese picture book watercolor illustration of a smiling florist wearing a green apron holding a colorful bouquet of flowers (はなやさん / florist), bright cheerful blooms, gentle watercolor wash, soft pencil contour, completely isolated on solid pure white background (#ffffff). Absolutely no text, no letters.",
        "tts_text": "お花屋さん",
        "subCategory": "oshigoto_hito",
        "subCategoryName": "おしごとのひと"
    },
    {
        "id": "h_ekiin",
        "name": "えきいんさん",
        "category": "hito",
        "categoryName": "ひと",
        "image": "images/h_ekiin.png",
        "file": "h_ekiin.png",
        "prompt": "Japanese picture book watercolor illustration of a neat railway station attendant in railway uniform and cap smiling politely (えきいんさん / train station attendant), professional friendly pose, gentle watercolor wash, soft pencil contour, completely isolated on solid pure white background (#ffffff). Absolutely no text, no letters.",
        "tts_text": "駅員さん",
        "subCategory": "oshigoto_hito",
        "subCategoryName": "おしごとのひと"
    },
    {
        "id": "h_untenshi",
        "name": "うんてんし",
        "category": "hito",
        "categoryName": "ひと",
        "image": "images/h_untenshi.png",
        "file": "h_untenshi.png",
        "prompt": "Japanese picture book watercolor illustration of a proud train or bus driver in uniform and peaked cap smiling while pointing forward (うんてんし / train driver, conductor), trustworthy pose, gentle watercolor wash, soft pencil contour, completely isolated on solid pure white background (#ffffff). Absolutely no text, no letters.",
        "tts_text": "運転士",
        "subCategory": "oshigoto_hito",
        "subCategoryName": "おしごとのひと"
    },
    {
        "id": "h_uchuuhikoushi",
        "name": "うちゅうひこうし",
        "category": "hito",
        "categoryName": "ひと",
        "image": "images/h_uchuuhikoushi.png",
        "file": "h_uchuuhikoushi.png",
        "prompt": "Japanese picture book watercolor illustration of a cute astronaut in a white space suit waving happily (うちゅうひこうし / astronaut), friendly transparent helmet visor showing smiling face, warm gentle watercolor wash, soft pencil contour, completely isolated on solid pure white background (#ffffff). Absolutely no text, no letters.",
        "tts_text": "宇宙飛行士",
        "subCategory": "oshigoto_hito",
        "subCategoryName": "おしごとのひと"
    },

    # 3. ものがたり・きせつのひと (7語)
    {
        "id": "h_santakuro-su",
        "name": "サンタクロース",
        "category": "hito",
        "categoryName": "ひと",
        "image": "images/h_santakuro-su.png",
        "file": "h_santakuro-su.png",
        "prompt": "Japanese picture book watercolor illustration of a jolly friendly Santa Claus in red suit with fluffy white beard and red hat smiling warmly holding a toy sack (サンタクロース / Santa Claus), merry holiday charm, gentle watercolor wash, soft pencil contour, completely isolated on solid pure white background (#ffffff). Absolutely no text, no letters.",
        "tts_text": "サンタクロース",
        "subCategory": "monogatari_hito",
        "subCategoryName": "ものがたりのひと"
    },
    {
        "id": "h_ohimesama",
        "name": "おひめさま",
        "category": "hito",
        "categoryName": "ひと",
        "image": "images/h_ohimesama.png",
        "file": "h_ohimesama.png",
        "prompt": "Japanese picture book watercolor illustration of a charming fairytale princess wearing an elegant pastel ballgown and sparkling tiara smiling gracefully (おひめさま / princess), magical fairytale aesthetic, gentle watercolor wash, soft pencil contour, completely isolated on solid pure white background (#ffffff). Absolutely no text, no letters.",
        "tts_text": "お姫様",
        "subCategory": "monogatari_hito",
        "subCategoryName": "ものがたりのひと"
    },
    {
        "id": "h_oujisama",
        "name": "おうじさま",
        "category": "hito",
        "categoryName": "ひと",
        "image": "images/h_oujisama.png",
        "file": "h_oujisama.png",
        "prompt": "Japanese picture book watercolor illustration of a handsome fairytale prince in royal tunic and cape with a golden circlet crown smiling gallantly (おうじさま / prince), noble gentle pose, gentle watercolor wash, soft pencil contour, completely isolated on solid pure white background (#ffffff). Absolutely no text, no letters.",
        "tts_text": "王子様",
        "subCategory": "monogatari_hito",
        "subCategoryName": "ものがたりのひと"
    },
    {
        "id": "h_mahoutsukai",
        "name": "まほうつかい",
        "category": "hito",
        "categoryName": "ひと",
        "image": "images/h_mahoutsukai.png",
        "file": "h_mahoutsukai.png",
        "prompt": "Japanese picture book watercolor illustration of a cute whimsical wizard or witch with a pointed hat holding a glowing magic star wand (まほうつかい / wizard, magician), playful gentle smile, gentle watercolor wash, soft pencil contour, completely isolated on solid pure white background (#ffffff). Absolutely no text, no letters.",
        "tts_text": "魔法使い",
        "subCategory": "monogatari_hito",
        "subCategoryName": "ものがたりのひと"
    },
    {
        "id": "h_hi-ro-",
        "name": "ヒーロー",
        "category": "hito",
        "categoryName": "ひと",
        "image": "images/h_hi-ro-.png",
        "file": "h_hi-ro-.png",
        "prompt": "Japanese picture book watercolor illustration of a cool and friendly superhero in bright colorful costume and cape striking a confident heroic pose (ヒーロー / superhero), brave energetic posture, gentle watercolor wash, soft pencil contour, completely isolated on solid pure white background (#ffffff). Absolutely no text, no letters.",
        "tts_text": "ヒーロー",
        "subCategory": "monogatari_hito",
        "subCategoryName": "ものがたりのひと"
    },
    {
        "id": "h_oni",
        "name": "おに",
        "category": "hito",
        "categoryName": "ひと",
        "image": "images/h_oni.png",
        "file": "h_oni.png",
        "prompt": "Japanese picture book watercolor illustration of a cute and colorful Japanese ogre with small horns wearing tiger-striped pants (おに / Japanese ogre, oni), funny friendly expression, Setsubun storybook charm, gentle watercolor wash, soft pencil contour, completely isolated on solid pure white background (#ffffff). Absolutely no text, no letters.",
        "tts_text": "鬼",
        "subCategory": "monogatari_hito",
        "subCategoryName": "ものがたりのひと"
    },
    {
        "id": "h_ninja",
        "name": "にんじゃ",
        "category": "hito",
        "categoryName": "ひと",
        "image": "images/h_ninja.png",
        "file": "h_ninja.png",
        "prompt": "Japanese picture book watercolor illustration of a cute agile ninja in traditional ninja outfit making a hand sign (にんじゃ / ninja), playful stealthy smile, storybook aesthetic, gentle watercolor wash, soft pencil contour, completely isolated on solid pure white background (#ffffff). Absolutely no text, no letters.",
        "tts_text": "忍者",
        "subCategory": "monogatari_hito",
        "subCategoryName": "ものがたりのひと"
    }
]

def main():
    with open(VOCAB_JS_PATH, 'r', encoding='utf-8') as f:
        content = f.read()

    # Parse VOCAB_LIST
    m = re.search(r'const VOCAB_LIST = (\[[\s\S]*?\]);', content)
    if not m:
        print("Failed to find VOCAB_LIST")
        return

    vocab_list = json.loads(m.group(1))
    print(f"Original word count: {len(vocab_list)}")

    # Normalize existing doushi -> ugoki
    for it in vocab_list:
        if it.get('category') == 'doushi':
            it['category'] = 'ugoki'
            it['categoryName'] = 'うごき'

    # Filter out if any hito_words already present
    existing_ids = {it['id'] for it in vocab_list}
    new_to_add = [w for w in hito_words if w['id'] not in existing_ids]

    print(f"Adding {len(new_to_add)} new words for 'hito' category...")
    vocab_list.extend(new_to_add)

    # Format VOCAB_LIST as JSON
    vocab_list_json = json.dumps(vocab_list, ensure_ascii=False, indent=2)

    # Reconstruct vocab.js content
    # Replace VOCAB_LIST array
    new_content = content[:m.start(1)] + vocab_list_json + content[m.end(1):]

    # Add hito to categories array if missing
    if '{ id: "hito"' not in new_content:
        cat_anchor = '{ id: "kimochi", name: "きもち", count: VOCAB_LIST.filter(w => w.category === "kimochi").length }'
        replacement_cat = cat_anchor + ',\n      { id: "hito", name: "ひと", count: VOCAB_LIST.filter(w => w.category === "hito").length }'
        new_content = new_content.replace(cat_anchor, replacement_cat)

    # Add new subcategories to subCategories object if missing
    new_subcats = '''  "kazoku_hito": "かぞく・みぢかなひと",
  "oshigoto_hito": "おしごとのひと",
  "monogatari_hito": "ものがたりのひと",
  "gakkou": "がっこう・しせつ"'''

    old_subcat_anchor = '  "gakkou": "がっこう・しせつ"'
    if '"kazoku_hito"' not in new_content and old_subcat_anchor in new_content:
        new_content = new_content.replace(old_subcat_anchor, new_subcats)

    with open(VOCAB_JS_PATH, 'w', encoding='utf-8') as f:
        f.write(new_content)

    print(f"✅ vocab.js updated successfully! Total words: {len(vocab_list)}")

if __name__ == '__main__':
    main()
