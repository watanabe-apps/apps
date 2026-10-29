/**
 * Common Vocabulary Dictionary (Curated)
 * Shared across Apps (kotoba_zukan, keyboard, karuta, review, etc.)
 */
(function(global) {
  "use strict";

  const VOCAB_LIST = [
  {
    "id": "d_inu",
    "name": "いぬ",
    "category": "doubutsu",
    "categoryName": "どうぶつ",
    "image": "images/d_inu.png",
    "file": "d_inu.png",
    "prompt": "A realistic-leaning educational picture book illustration of friendly Shiba Inu dog standing (いぬ). Style: Gentle warm Japanese picture book style with delicate watercolor and colored pencil textures, subtle clear contours (floppy-perky ears, warm eyes, curled tail, golden-brown and white fur). Completely isolated on a solid pure white background (#ffffff) with no ground clutter, no background scenery, no props, no text, no watermarks, perfectly suited for a vocabulary flashcard for children. NOT a photograph, an illustration."
  },
  {
    "id": "d_neko",
    "name": "ねこ",
    "category": "doubutsu",
    "categoryName": "どうぶつ",
    "image": "images/d_neko.png",
    "file": "d_neko.png",
    "prompt": "A realistic-leaning educational picture book illustration of calico or tabby domestic cat sitting (ねこ). Style: Gentle warm Japanese picture book style with delicate watercolor and colored pencil textures, subtle clear contours (pointed ears, gentle whiskers, soft paws, curled tail, gentle green eyes). Completely isolated on a solid pure white background (#ffffff) with no ground clutter, no background scenery, no props, no text, no watermarks, perfectly suited for a vocabulary flashcard for children. NOT a photograph, an illustration."
  },
  {
    "id": "d_hamusuta-",
    "name": "はむすたー",
    "category": "doubutsu",
    "categoryName": "どうぶつ",
    "image": "images/d_hamusuta-.png",
    "file": "d_hamusuta-.png",
    "prompt": "A realistic-leaning educational picture book illustration of a cute golden hamster sitting (はむすたー). Style: Gentle warm Japanese picture book style with delicate watercolor and colored pencil textures, subtle clear contours (chubby cheeks holding sunflower seed, soft golden-brown fur). Completely isolated on a solid pure white background (#ffffff) with no clutter, suitable for children vocabulary flashcard. NOT a photograph, an illustration."
  },
  {
    "id": "d_usagi",
    "name": "うさぎ",
    "category": "doubutsu",
    "categoryName": "どうぶつ",
    "image": "images/d_usagi.png",
    "file": "d_usagi.png",
    "prompt": "A realistic-leaning educational picture book illustration of white bunny rabbit sitting upright (うさぎ). Style: Gentle warm Japanese picture book style with delicate watercolor and colored pencil textures, subtle clear contours (long upright ears with soft pink inside, twitching nose, round fluffy tail, soft white fur). Completely isolated on a solid pure white background (#ffffff) with no ground clutter, no background scenery, no props, no text, no watermarks, perfectly suited for a vocabulary flashcard for children. NOT a photograph, an illustration."
  },
  {
    "id": "d_uma",
    "name": "うま",
    "category": "doubutsu",
    "categoryName": "どうぶつ",
    "image": "images/d_uma.png",
    "file": "d_uma.png",
    "prompt": "A realistic-leaning educational picture book illustration of handsome brown horse standing gracefully (うま). Style: Gentle warm Japanese picture book style with delicate watercolor and colored pencil textures, subtle clear contours (flowing dark mane and tail, slender muscular legs, gentle muzzle and eyes). Completely isolated on a solid pure white background (#ffffff) with no ground clutter, no background scenery, no props, no text, no watermarks, perfectly suited for a vocabulary flashcard for children. NOT a photograph, an illustration."
  },
  {
    "id": "d_ushi",
    "name": "うし",
    "category": "doubutsu",
    "categoryName": "どうぶつ",
    "image": "images/d_ushi.png",
    "file": "d_ushi.png",
    "prompt": "A realistic-leaning educational picture book illustration of a dairy cow standing (うし). Style: Gentle warm Japanese picture book style with delicate watercolor and colored pencil textures, subtle clear contours (black and white Holstein markings, gentle eyes, pink nose muzzle, small horns). Completely isolated on a solid pure white background (#ffffff) with no clutter, suitable for children vocabulary flashcard. NOT a photograph, an illustration."
  },
  {
    "id": "d_buta",
    "name": "ぶた",
    "category": "doubutsu",
    "categoryName": "どうぶつ",
    "image": "images/d_buta.png",
    "file": "d_buta.png",
    "prompt": "A realistic-leaning educational picture book illustration of pink piglet standing in side view (ぶた). Style: Gentle warm Japanese picture book style with delicate watercolor and colored pencil textures, subtle clear contours (curly tail, cute snout nose, floppy ears, soft pink skin). Completely isolated on a solid pure white background (#ffffff) with no ground clutter, no background scenery, no props, no text, no watermarks, perfectly suited for a vocabulary flashcard for children. NOT a photograph, an illustration."
  },
  {
    "id": "d_hitsuji",
    "name": "ひつじ",
    "category": "doubutsu",
    "categoryName": "どうぶつ",
    "image": "images/d_hitsuji.png",
    "file": "d_hitsuji.png",
    "prompt": "A realistic-leaning educational picture book illustration of a fluffy wool sheep (ひつじ). Style: Gentle warm Japanese picture book style with delicate watercolor and colored pencil textures, subtle clear contours (soft cloud-like white fleece, warm beige face and floppy ears). Completely isolated on a solid pure white background (#ffffff) with no clutter, suitable for children vocabulary flashcard. NOT a photograph, an illustration."
  },
  {
    "id": "d_niwatori",
    "name": "にわとり",
    "category": "doubutsu",
    "categoryName": "どうぶつ",
    "image": "images/d_niwatori.png",
    "file": "d_niwatori.png",
    "prompt": "A realistic-leaning educational picture book illustration of a farm rooster (にわとり). Style: Gentle warm Japanese picture book style with delicate watercolor and colored pencil textures, subtle clear contours (bright red comb and wattle, white and brown feathers, glossy tail feathers). Completely isolated on a solid pure white background (#ffffff) with no clutter, suitable for children vocabulary flashcard. NOT a photograph, an illustration."
  },
  {
    "id": "d_hiyoko",
    "name": "ひよこ",
    "category": "doubutsu",
    "categoryName": "どうぶつ",
    "image": "images/d_hiyoko.png",
    "file": "d_hiyoko.png",
    "prompt": "A realistic-leaning educational picture book illustration of fluffy yellow chick standing (ひよこ). Style: Gentle warm Japanese picture book style with delicate watercolor and colored pencil textures, subtle clear contours (soft bright yellow down feathers, tiny orange beak, little wings, cute small feet). Completely isolated on a solid pure white background (#ffffff) with no ground clutter, no background scenery, no props, no text, no watermarks, perfectly suited for a vocabulary flashcard for children. NOT a photograph, an illustration."
  },
  {
    "id": "d_zou",
    "name": "ぞう",
    "category": "doubutsu",
    "categoryName": "どうぶつ",
    "image": "images/d_zou.png",
    "file": "d_zou.png",
    "prompt": "A realistic-leaning educational picture book illustration of African or Asian elephant standing in side view (ぞう). Style: Gentle warm Japanese picture book style with delicate watercolor and colored pencil textures, subtle clear contours (long curving trunk, large gentle ears, sturdy wrinkled legs, short tail). Completely isolated on a solid pure white background (#ffffff) with no ground clutter, no background scenery, no props, no text, no watermarks, perfectly suited for a vocabulary flashcard for children. NOT a photograph, an illustration."
  },
  {
    "id": "d_kirin",
    "name": "きりん",
    "category": "doubutsu",
    "categoryName": "どうぶつ",
    "image": "images/d_kirin.png",
    "file": "d_kirin.png",
    "prompt": "A realistic-leaning educational picture book illustration of tall giraffe in side view (きりん). Style: Gentle warm Japanese picture book style with delicate watercolor and colored pencil textures, subtle clear contours (long elegant neck, distinct brown patch pattern, gentle face with small ossicones (horns)). Completely isolated on a solid pure white background (#ffffff) with no ground clutter, no background scenery, no props, no text, no watermarks, perfectly suited for a vocabulary flashcard for children. NOT a photograph, an illustration."
  },
  {
    "id": "d_raion",
    "name": "らいおん",
    "category": "doubutsu",
    "categoryName": "どうぶつ",
    "image": "images/d_raion.png",
    "file": "d_raion.png",
    "prompt": "A realistic-leaning educational picture book illustration of majestic male lion sitting proudly (らいおん). Style: Gentle warm Japanese picture book style with delicate watercolor and colored pencil textures, subtle clear contours (full fluffy mane, warm golden-amber fur, calm and gentle expression). Completely isolated on a solid pure white background (#ffffff) with no ground clutter, no background scenery, no props, no text, no watermarks, perfectly suited for a vocabulary flashcard for children. NOT a photograph, an illustration."
  },
  {
    "id": "d_tora",
    "name": "とら",
    "category": "doubutsu",
    "categoryName": "どうぶつ",
    "image": "images/d_tora.png",
    "file": "d_tora.png",
    "prompt": "A realistic-leaning educational picture book illustration of handsome tiger standing in side view (とら). Style: Gentle warm Japanese picture book style with delicate watercolor and colored pencil textures, subtle clear contours (vibrant orange coat with bold black stripes, white belly, graceful feline form). Completely isolated on a solid pure white background (#ffffff) with no ground clutter, no background scenery, no props, no text, no watermarks, perfectly suited for a vocabulary flashcard for children. NOT a photograph, an illustration."
  },
  {
    "id": "d_panda",
    "name": "ぱんだ",
    "category": "doubutsu",
    "categoryName": "どうぶつ",
    "image": "images/d_panda.png",
    "file": "d_panda.png",
    "prompt": "A realistic-leaning educational picture book illustration of giant panda sitting comfortably (ぱんだ). Style: Gentle warm Japanese picture book style with delicate watercolor and colored pencil textures, subtle clear contours (distinctive black eye patches, round black ears, black and white fur, cute posture). Completely isolated on a solid pure white background (#ffffff) with no ground clutter, no background scenery, no props, no text, no watermarks, perfectly suited for a vocabulary flashcard for children. NOT a photograph, an illustration."
  },
  {
    "id": "d_koara",
    "name": "こあら",
    "category": "doubutsu",
    "categoryName": "どうぶつ",
    "image": "images/d_koara.png",
    "file": "d_koara.png",
    "prompt": "A realistic-leaning educational picture book illustration of cute koala clinging to a gentle branch or sitting (こあら). Style: Gentle warm Japanese picture book style with delicate watercolor and colored pencil textures, subtle clear contours (large fluffy round ears, smooth dark oval nose, soft grey fur). Completely isolated on a solid pure white background (#ffffff) with no ground clutter, no background scenery, no props, no text, no watermarks, perfectly suited for a vocabulary flashcard for children. NOT a photograph, an illustration."
  },
  {
    "id": "d_kuma",
    "name": "くま",
    "category": "doubutsu",
    "categoryName": "どうぶつ",
    "image": "images/d_kuma.png",
    "file": "d_kuma.png",
    "prompt": "A realistic-leaning educational picture book illustration of gentle brown bear sitting (くま). Style: Gentle warm Japanese picture book style with delicate watercolor and colored pencil textures, subtle clear contours (round ears, sturdy furry body, warm brown coat, friendly and calm expression). Completely isolated on a solid pure white background (#ffffff) with no ground clutter, no background scenery, no props, no text, no watermarks, perfectly suited for a vocabulary flashcard for children. NOT a photograph, an illustration."
  },
  {
    "id": "d_saru",
    "name": "さる",
    "category": "doubutsu",
    "categoryName": "どうぶつ",
    "image": "images/d_saru.png",
    "file": "d_saru.png",
    "prompt": "A realistic-leaning educational picture book illustration of Japanese macaque monkey sitting (さる). Style: Gentle warm Japanese picture book style with delicate watercolor and colored pencil textures, subtle clear contours (light brown fur, pinkish friendly face, lively eyes, expressive hands and feet). Completely isolated on a solid pure white background (#ffffff) with no ground clutter, no background scenery, no props, no text, no watermarks, perfectly suited for a vocabulary flashcard for children. NOT a photograph, an illustration."
  },
  {
    "id": "d_pengin",
    "name": "ぺんぎん",
    "category": "doubutsu",
    "categoryName": "どうぶつ",
    "image": "images/d_pengin.png",
    "file": "d_pengin.png",
    "prompt": "A realistic-leaning educational picture book illustration of Emperor or Gentoo penguin standing upright (ぺんぎん). Style: Gentle warm Japanese picture book style with delicate watercolor and colored pencil textures, subtle clear contours (black back, crisp white belly, yellow-orange neck patch, flippers and webbed feet). Completely isolated on a solid pure white background (#ffffff) with no ground clutter, no background scenery, no props, no text, no watermarks, perfectly suited for a vocabulary flashcard for children. NOT a photograph, an illustration."
  },
  {
    "id": "d_kaeru",
    "name": "かえる",
    "category": "doubutsu",
    "categoryName": "どうぶつ",
    "image": "images/d_kaeru.png",
    "file": "d_kaeru.png",
    "prompt": "A realistic-leaning educational picture book illustration of green tree frog sitting calmly (かえる). Style: Gentle warm Japanese picture book style with delicate watercolor and colored pencil textures, subtle clear contours (smooth bright green skin, big gentle round eyes, webbed toes). Completely isolated on a solid pure white background (#ffffff) with no ground clutter, no background scenery, no props, no text, no watermarks, perfectly suited for a vocabulary flashcard for children. NOT a photograph, an illustration."
  },
  {
    "id": "d_kame",
    "name": "かめ",
    "category": "doubutsu",
    "categoryName": "どうぶつ",
    "image": "images/d_kame.png",
    "file": "d_kame.png",
    "prompt": "A realistic-leaning educational picture book illustration of land turtle or tortoise crawling slowly (かめ). Style: Gentle warm Japanese picture book style with delicate watercolor and colored pencil textures, subtle clear contours (textured domed shell, wrinkled neck and legs, friendly wise expression). Completely isolated on a solid pure white background (#ffffff) with no ground clutter, no background scenery, no props, no text, no watermarks, perfectly suited for a vocabulary flashcard for children. NOT a photograph, an illustration."
  },
  {
    "id": "d_wani",
    "name": "わに",
    "category": "doubutsu",
    "categoryName": "どうぶつ",
    "image": "images/d_wani.png",
    "file": "d_wani.png",
    "prompt": "A realistic-leaning educational picture book illustration of crocodile lying in side view (わに). Style: Gentle warm Japanese picture book style with delicate watercolor and colored pencil textures, subtle clear contours (textured scales, long snout with teeth, strong tail, gentle non-threatening educational style). Completely isolated on a solid pure white background (#ffffff) with no ground clutter, no background scenery, no props, no text, no watermarks, perfectly suited for a vocabulary flashcard for children. NOT a photograph, an illustration."
  },
  {
    "id": "d_kani",
    "name": "かに",
    "category": "doubutsu",
    "categoryName": "どうぶつ",
    "image": "images/d_kani.png",
    "file": "d_kani.png",
    "prompt": "A realistic-leaning educational picture book illustration of a red crab on white background (かに). Style: Gentle warm Japanese picture book style with delicate watercolor and colored pencil textures, subtle clear contours (round red carapace shell, two raised pincers, friendly eyestalks). Completely isolated on a solid pure white background (#ffffff) with no clutter, suitable for children vocabulary flashcard. NOT a photograph, an illustration."
  },
  {
    "id": "d_sakana",
    "name": "さかな",
    "category": "doubutsu",
    "categoryName": "どうぶつ",
    "image": "images/d_sakana.png",
    "file": "d_sakana.png",
    "prompt": "A realistic-leaning educational picture book illustration of a graceful swimming goldfish / orange fish (さかな). Style: Gentle warm Japanese picture book style with delicate watercolor and colored pencil textures, subtle clear contours (vibrant orange-red scales, translucent flowing fins). Completely isolated on a solid pure white background (#ffffff) with no clutter, suitable for children vocabulary flashcard. NOT a photograph, an illustration."
  },
  {
    "id": "d_kaba",
    "name": "かば",
    "category": "doubutsu",
    "categoryName": "どうぶつ",
    "image": "images/d_kaba.png",
    "file": "d_kaba.png",
    "prompt": "A realistic-leaning educational picture book illustration of a cute round hippopotamus standing on four legs, smooth grey skin, friendly face, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "d_sai",
    "name": "さい",
    "category": "doubutsu",
    "categoryName": "どうぶつ",
    "image": "images/d_sai.png",
    "file": "d_sai.png",
    "prompt": "A realistic-leaning educational picture book illustration of a sturdy rhinoceros with distinct horn on snout, tough grey skin, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "d_shimauma",
    "name": "しまうま",
    "category": "doubutsu",
    "categoryName": "どうぶつ",
    "image": "images/d_shimauma.png",
    "file": "d_shimauma.png",
    "prompt": "A realistic-leaning educational picture book illustration of a graceful zebra with crisp black and white vertical stripes, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "d_chi-ta-",
    "name": "ちーたー",
    "category": "doubutsu",
    "categoryName": "どうぶつ",
    "image": "images/d_chi-ta-.png",
    "file": "d_chi-ta-.png",
    "prompt": "A realistic-leaning educational picture book illustration of a sleek cheetah with spotted coat and slender athletic body, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "d_kangar-",
    "name": "かんがるー",
    "category": "doubutsu",
    "categoryName": "どうぶつ",
    "image": "images/d_kangar-.png",
    "file": "d_kangar-.png",
    "prompt": "A realistic-leaning educational picture book illustration of a friendly kangaroo standing upright on strong hind legs, small joey in pouch, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "d_rakuda",
    "name": "らくだ",
    "category": "doubutsu",
    "categoryName": "どうぶつ",
    "image": "images/d_rakuda.png",
    "file": "d_rakuda.png",
    "prompt": "A realistic-leaning educational picture book illustration of a two-humped camel standing calmly with warm brown woolly coat, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "d_arupaka",
    "name": "あるぱか",
    "category": "doubutsu",
    "categoryName": "どうぶつ",
    "image": "images/d_arupaka.png",
    "file": "d_arupaka.png",
    "prompt": "A realistic-leaning educational picture book illustration of a fluffy white alpaca with friendly gentle face and thick wool, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "d_gorira",
    "name": "ごりら",
    "category": "doubutsu",
    "categoryName": "どうぶつ",
    "image": "images/d_gorira.png",
    "file": "d_gorira.png",
    "prompt": "A realistic-leaning educational picture book illustration of a strong gentle silverback gorilla sitting peacefully on knuckles, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "d_chinpanji-",
    "name": "ちんぱんじー",
    "category": "doubutsu",
    "categoryName": "どうぶつ",
    "image": "images/d_chinpanji-.png",
    "file": "d_chinpanji-.png",
    "prompt": "A realistic-leaning educational picture book illustration of a curious friendly chimpanzee sitting upright, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "d_shika",
    "name": "しか",
    "category": "doubutsu",
    "categoryName": "どうぶつ",
    "image": "images/d_shika.png",
    "file": "d_shika.png",
    "prompt": "A realistic-leaning educational picture book illustration of a gentle spotted Japanese deer standing gracefully with small antlers, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "d_tonakai",
    "name": "となかい",
    "category": "doubutsu",
    "categoryName": "どうぶつ",
    "image": "images/d_tonakai.png",
    "file": "d_tonakai.png",
    "prompt": "A realistic-leaning educational picture book illustration of a reindeer with large branching antlers and warm thick winter coat, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "d_inoshishi",
    "name": "いのしし",
    "category": "doubutsu",
    "categoryName": "どうぶつ",
    "image": "images/d_inoshishi.png",
    "file": "d_inoshishi.png",
    "prompt": "A realistic-leaning educational picture book illustration of a wild boar with coarse brown bristle coat and small tusks, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "d_yagi",
    "name": "やぎ",
    "category": "doubutsu",
    "categoryName": "どうぶつ",
    "image": "images/d_yagi.png",
    "file": "d_yagi.png",
    "prompt": "A realistic-leaning educational picture book illustration of a friendly white domestic goat with small curved horns and little beard, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "d_kitsune",
    "name": "きつね",
    "category": "doubutsu",
    "categoryName": "どうぶつ",
    "image": "images/d_kitsune.png",
    "file": "d_kitsune.png",
    "prompt": "A realistic-leaning educational picture book illustration of a bushy-tailed Japanese red fox with pointy alert ears and white chest, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "d_tanuki",
    "name": "たぬき",
    "category": "doubutsu",
    "categoryName": "どうぶつ",
    "image": "images/d_tanuki.png",
    "file": "d_tanuki.png",
    "prompt": "A realistic-leaning educational picture book illustration of a cute Japanese raccoon dog (tanuki) with fluffy round body and mask markings, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "d_araiguma",
    "name": "あらいぐま",
    "category": "doubutsu",
    "categoryName": "どうぶつ",
    "image": "images/d_araiguma.png",
    "file": "d_araiguma.png",
    "prompt": "A realistic-leaning educational picture book illustration of a striped-tailed raccoon sitting up with banded black facial mask, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "d_kawauso",
    "name": "かわうそ",
    "category": "doubutsu",
    "categoryName": "どうぶつ",
    "image": "images/d_kawauso.png",
    "file": "d_kawauso.png",
    "prompt": "A realistic-leaning educational picture book illustration of a playful river otter holding a small pebble with glossy brown fur, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "d_mogura",
    "name": "もぐら",
    "category": "doubutsu",
    "categoryName": "どうぶつ",
    "image": "images/d_mogura.png",
    "file": "d_mogura.png",
    "prompt": "A realistic-leaning educational picture book illustration of a cute little mole emerging from soft soil with velvety dark fur and paddle paws, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "d_koumori",
    "name": "こうもり",
    "category": "doubutsu",
    "categoryName": "どうぶつ",
    "image": "images/d_koumori.png",
    "file": "d_koumori.png",
    "prompt": "A realistic-leaning educational picture book illustration of a gentle fruit bat hanging upside down with folded wings, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "d_risu",
    "name": "りす",
    "category": "doubutsu",
    "categoryName": "どうぶつ",
    "image": "images/d_risu.png",
    "file": "d_risu.png",
    "prompt": "A realistic-leaning educational picture book illustration of a cute chipmunk squirrel holding an acorn with fluffy arched tail, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "d_harinezumi",
    "name": "はりねずみ",
    "category": "doubutsu",
    "categoryName": "どうぶつ",
    "image": "images/d_harinezumi.png",
    "file": "d_harinezumi.png",
    "prompt": "A realistic-leaning educational picture book illustration of a round hedgehog curled gently showing spiky soft quills and sweet snout, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "d_shirokuma",
    "name": "しろくま",
    "category": "doubutsu",
    "categoryName": "どうぶつ",
    "image": "images/d_shirokuma.png",
    "file": "d_shirokuma.png",
    "prompt": "A realistic-leaning educational picture book illustration of a majestic polar bear with thick creamy-white fur standing strong, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "d_kujira",
    "name": "くじら",
    "category": "doubutsu",
    "categoryName": "どうぶつ",
    "image": "images/d_kujira.png",
    "file": "d_kujira.png",
    "prompt": "A realistic-leaning educational picture book illustration of a blue whale swimming peacefully with smooth sleek body and flukes, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "d_iruka",
    "name": "いるか",
    "category": "doubutsu",
    "categoryName": "どうぶつ",
    "image": "images/d_iruka.png",
    "file": "d_iruka.png",
    "prompt": "A realistic-leaning educational picture book illustration of a cheerful friendly bottlenose dolphin leaping gracefully, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "d_shachi",
    "name": "しゃち",
    "category": "doubutsu",
    "categoryName": "どうぶつ",
    "image": "images/d_shachi.png",
    "file": "d_shachi.png",
    "prompt": "A realistic-leaning educational picture book illustration of a majestic killer whale (orca) with glossy black and white markings, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "d_azarashi",
    "name": "あざらし",
    "category": "doubutsu",
    "categoryName": "どうぶつ",
    "image": "images/d_azarashi.png",
    "file": "d_azarashi.png",
    "prompt": "A realistic-leaning educational picture book illustration of a spotted harbor seal lying comfortably with round friendly face and whiskers, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "d_rakko",
    "name": "らっこ",
    "category": "doubutsu",
    "categoryName": "どうぶつ",
    "image": "images/d_rakko.png",
    "file": "d_rakko.png",
    "prompt": "A realistic-leaning educational picture book illustration of a cute sea otter floating on its back holding a sea shell on its tummy, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "d_same",
    "name": "さめ",
    "category": "doubutsu",
    "categoryName": "どうぶつ",
    "image": "images/d_same.png",
    "file": "d_same.png",
    "prompt": "A realistic-leaning educational picture book illustration of a sleek grey reef shark with classic dorsal fin swimming smoothly, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "d_jinbeezame",
    "name": "じんべえざめ",
    "category": "doubutsu",
    "categoryName": "どうぶつ",
    "image": "images/d_jinbeezame.png",
    "file": "d_jinbeezame.png",
    "prompt": "A realistic-leaning educational picture book illustration of a gentle giant whale shark covered with white starry dots and stripes, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "d_manbou",
    "name": "まんぼう",
    "category": "doubutsu",
    "categoryName": "どうぶつ",
    "image": "images/d_manbou.png",
    "file": "d_manbou.png",
    "prompt": "A realistic-leaning educational picture book illustration of a round bizarre ocean sunfish swimming with dorsal and anal fins, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "d_kumanomi",
    "name": "くまのみ",
    "category": "doubutsu",
    "categoryName": "どうぶつ",
    "image": "images/d_kumanomi.png",
    "file": "d_kumanomi.png",
    "prompt": "A realistic-leaning educational picture book illustration of an orange clownfish with three bright white vertical stripes, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "d_tatsunootoshigo",
    "name": "たつのおとしご",
    "category": "doubutsu",
    "categoryName": "どうぶつ",
    "image": "images/d_tatsunootoshigo.png",
    "file": "d_tatsunootoshigo.png",
    "prompt": "A realistic-leaning educational picture book illustration of a delicate yellow seahorse upright with curled tail, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "d_maguro",
    "name": "まぐろ",
    "category": "doubutsu",
    "categoryName": "どうぶつ",
    "image": "images/d_maguro.png",
    "file": "d_maguro.png",
    "prompt": "A realistic-leaning educational picture book illustration of a powerful bluefin tuna with metallic blue-silver torpedo body, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "d_medaka",
    "name": "めだか",
    "category": "doubutsu",
    "categoryName": "どうぶつ",
    "image": "images/d_medaka.png",
    "file": "d_medaka.png",
    "prompt": "A realistic-leaning educational picture book illustration of a tiny Japanese killifish (medaka) translucent swimming gracefully, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "d_kingyo",
    "name": "きんぎょ",
    "category": "doubutsu",
    "categoryName": "どうぶつ",
    "image": "images/d_kingyo.png",
    "file": "d_kingyo.png",
    "prompt": "A realistic-leaning educational picture book illustration of a fancy red and white Japanese goldfish with flowing fan tail, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "d_koi",
    "name": "こい",
    "category": "doubutsu",
    "categoryName": "どうぶつ",
    "image": "images/d_koi.png",
    "file": "d_koi.png",
    "prompt": "A realistic-leaning educational picture book illustration of a magnificent Nishikigoi carp with vibrant orange, black and white markings, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "d_tako",
    "name": "たこ",
    "category": "doubutsu",
    "categoryName": "どうぶつ",
    "image": "images/d_tako.png",
    "file": "d_tako.png",
    "prompt": "A realistic-leaning educational picture book illustration of a friendly red octopus with eight curled tentacles with suction cups, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "d_ika",
    "name": "いか",
    "category": "doubutsu",
    "categoryName": "どうぶつ",
    "image": "images/d_ika.png",
    "file": "d_ika.png",
    "prompt": "A realistic-leaning educational picture book illustration of a white translucent squid with pointed mantle and long tentacles, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "d_ebi",
    "name": "えび",
    "category": "doubutsu",
    "categoryName": "どうぶつ",
    "image": "images/d_ebi.png",
    "file": "d_ebi.png",
    "prompt": "A realistic-leaning educational picture book illustration of a curved red shrimp with long antennae and segmented shell, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "d_zarigani",
    "name": "ざりがに",
    "category": "doubutsu",
    "categoryName": "どうぶつ",
    "image": "images/d_zarigani.png",
    "file": "d_zarigani.png",
    "prompt": "A realistic-leaning educational picture book illustration of a red freshwater crayfish with prominent pincers and segmented body, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "d_yadokari",
    "name": "やどかり",
    "category": "doubutsu",
    "categoryName": "どうぶつ",
    "image": "images/d_yadokari.png",
    "file": "d_yadokari.png",
    "prompt": "A realistic-leaning educational picture book illustration of a cute hermit crab peering out of a spiral seashell, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "d_kurage",
    "name": "くらげ",
    "category": "doubutsu",
    "categoryName": "どうぶつ",
    "image": "images/d_kurage.png",
    "file": "d_kurage.png",
    "prompt": "A realistic-leaning educational picture book illustration of a bell-shaped translucent jellyfish with delicate trailing tentacles, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "d_hitode",
    "name": "ひとで",
    "category": "doubutsu",
    "categoryName": "どうぶつ",
    "image": "images/d_hitode.png",
    "file": "d_hitode.png",
    "prompt": "A realistic-leaning educational picture book illustration of a five-armed orange starfish lying flat, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "d_suzume",
    "name": "すずめ",
    "category": "doubutsu",
    "categoryName": "どうぶつ",
    "image": "images/d_suzume.png",
    "file": "d_suzume.png",
    "prompt": "A realistic-leaning educational picture book illustration of a cute little Eurasian tree sparrow perched on a twig with brown patterned feathers, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "d_hato",
    "name": "はと",
    "category": "doubutsu",
    "categoryName": "どうぶつ",
    "image": "images/d_hato.png",
    "file": "d_hato.png",
    "prompt": "A realistic-leaning educational picture book illustration of a gentle grey pigeon with iridescent green-purple neck feathers, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "d_karasu",
    "name": "からす",
    "category": "doubutsu",
    "categoryName": "どうぶつ",
    "image": "images/d_karasu.png",
    "file": "d_karasu.png",
    "prompt": "A realistic-leaning educational picture book illustration of a glossy black jungle crow with intelligent sharp beak, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "d_tsubame",
    "name": "つばめ",
    "category": "doubutsu",
    "categoryName": "どうぶつ",
    "image": "images/d_tsubame.png",
    "file": "d_tsubame.png",
    "prompt": "A realistic-leaning educational picture book illustration of a sleek barn swallow in flight with glossy navy back, red throat, and forked tail, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "d_kitsutsuki",
    "name": "きつつき",
    "category": "doubutsu",
    "categoryName": "どうぶつ",
    "image": "images/d_kitsutsuki.png",
    "file": "d_kitsutsuki.png",
    "prompt": "A realistic-leaning educational picture book illustration of a spotted woodpecker clinging to tree trunk with red crest, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "d_fukurou",
    "name": "ふくろう",
    "category": "doubutsu",
    "categoryName": "どうぶつ",
    "image": "images/d_fukurou.png",
    "file": "d_fukurou.png",
    "prompt": "A realistic-leaning educational picture book illustration of a wise round barn owl perched upright with heart-shaped facial disk, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "d_washi",
    "name": "わし",
    "category": "doubutsu",
    "categoryName": "どうぶつ",
    "image": "images/d_washi.png",
    "file": "d_washi.png",
    "prompt": "A realistic-leaning educational picture book illustration of a majestic golden eagle soaring with broad wings and hooked beak, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "d_kamo",
    "name": "かも",
    "category": "doubutsu",
    "categoryName": "どうぶつ",
    "image": "images/d_kamo.png",
    "file": "d_kamo.png",
    "prompt": "A realistic-leaning educational picture book illustration of a mallard duck with iridescent emerald green head and yellow bill, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "d_hakuchou",
    "name": "はくちょう",
    "category": "doubutsu",
    "categoryName": "どうぶつ",
    "image": "images/d_hakuchou.png",
    "file": "d_hakuchou.png",
    "prompt": "A realistic-leaning educational picture book illustration of a graceful mute swan swimming with curved neck and white feathers, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "d_tsuru",
    "name": "つる",
    "category": "doubutsu",
    "categoryName": "どうぶつ",
    "image": "images/d_tsuru.png",
    "file": "d_tsuru.png",
    "prompt": "A realistic-leaning educational picture book illustration of an elegant red-crowned Japanese crane standing on one slender leg with red crown patch, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "d_furamingo",
    "name": "ふらみんご",
    "category": "doubutsu",
    "categoryName": "どうぶつ",
    "image": "images/d_furamingo.png",
    "file": "d_furamingo.png",
    "prompt": "A realistic-leaning educational picture book illustration of a tall pink flamingo standing on one leg with hooked bill, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "d_perikan",
    "name": "ぺりかん",
    "category": "doubutsu",
    "categoryName": "どうぶつ",
    "image": "images/d_perikan.png",
    "file": "d_perikan.png",
    "prompt": "A realistic-leaning educational picture book illustration of a white pelican with large yellow throat pouch, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "d_oumu",
    "name": "おうむ",
    "category": "doubutsu",
    "categoryName": "どうぶつ",
    "image": "images/d_oumu.png",
    "file": "d_oumu.png",
    "prompt": "A realistic-leaning educational picture book illustration of a white cockatoo with bright yellow crest feathers raised, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "d_kujaku",
    "name": "くじゃく",
    "category": "doubutsu",
    "categoryName": "どうぶつ",
    "image": "images/d_kujaku.png",
    "file": "d_kujaku.png",
    "prompt": "A realistic-leaning educational picture book illustration of an Indian peacock displaying magnificent shimmering tail feathers in a full fan, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "d_dachou",
    "name": "だちょう",
    "category": "doubutsu",
    "categoryName": "どうぶつ",
    "image": "images/d_dachou.png",
    "file": "d_dachou.png",
    "prompt": "A realistic-leaning educational picture book illustration of a tall ostrich with long bare neck and fluffy black-and-white body feathers, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "d_kamereon",
    "name": "かめれおん",
    "category": "doubutsu",
    "categoryName": "どうぶつ",
    "image": "images/d_kamereon.png",
    "file": "d_kamereon.png",
    "prompt": "A realistic-leaning educational picture book illustration of a colorful veiled chameleon gripping branch with curled prehensile tail and swivel eyes, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "d_tokage",
    "name": "とかげ",
    "category": "doubutsu",
    "categoryName": "どうぶつ",
    "image": "images/d_tokage.png",
    "file": "d_tokage.png",
    "prompt": "A realistic-leaning educational picture book illustration of a nimble Japanese lizard with iridescent metallic blue tail, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "d_hebi",
    "name": "へび",
    "category": "doubutsu",
    "categoryName": "どうぶつ",
    "image": "images/d_hebi.png",
    "file": "d_hebi.png",
    "prompt": "A realistic-leaning educational picture book illustration of a green grass snake coiled peacefully with smooth scaly skin, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "d_otamajakushi",
    "name": "おたまじゃくし",
    "category": "doubutsu",
    "categoryName": "どうぶつ",
    "image": "images/d_otamajakushi.png",
    "file": "d_otamajakushi.png",
    "prompt": "A realistic-leaning educational picture book illustration of a cute little black tadpole swimming with fluttering tail, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "d_kabutomushi",
    "name": "かぶとむし",
    "category": "doubutsu",
    "categoryName": "どうぶつ",
    "image": "images/d_kabutomushi.png",
    "file": "d_kabutomushi.png",
    "prompt": "A realistic-leaning educational picture book illustration of a magnificent Japanese rhinoceros beetle with glossy black-brown shell and proud Y-shaped horn, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "d_kuwagata",
    "name": "くわがた",
    "category": "doubutsu",
    "categoryName": "どうぶつ",
    "image": "images/d_kuwagata.png",
    "file": "d_kuwagata.png",
    "prompt": "A realistic-leaning educational picture book illustration of a Japanese stag beetle with glossy black exoskeleton and large pincer mandibles, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "d_hotaru",
    "name": "ほたる",
    "category": "doubutsu",
    "categoryName": "どうぶつ",
    "image": "images/d_hotaru.png",
    "file": "d_hotaru.png",
    "prompt": "A realistic-leaning educational picture book illustration of a firefly glowing softly with warm yellow-green light from abdomen, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "d_tentoumushi",
    "name": "てんとうむし",
    "category": "doubutsu",
    "categoryName": "どうぶつ",
    "image": "images/d_tentoumushi.png",
    "file": "d_tentoumushi.png",
    "prompt": "A realistic-leaning educational picture book illustration of a shiny red seven-spotted ladybug walking on a green stem, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "d_agehachou",
    "name": "あげはちょう",
    "category": "doubutsu",
    "categoryName": "どうぶつ",
    "image": "images/d_agehachou.png",
    "file": "d_agehachou.png",
    "prompt": "A realistic-leaning educational picture book illustration of a magnificent yellow and black swallowtail butterfly with open wings, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "d_tonbo",
    "name": "とんぼ",
    "category": "doubutsu",
    "categoryName": "どうぶつ",
    "image": "images/d_tonbo.png",
    "file": "d_tonbo.png",
    "prompt": "A realistic-leaning educational picture book illustration of a dragonfly resting with clear transparent veined wings outstretched, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "d_semi",
    "name": "せみ",
    "category": "doubutsu",
    "categoryName": "どうぶつ",
    "image": "images/d_semi.png",
    "file": "d_semi.png",
    "prompt": "A realistic-leaning educational picture book illustration of a cicada clinging to tree bark with clear membranous wings, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "d_batta",
    "name": "ばった",
    "category": "doubutsu",
    "categoryName": "どうぶつ",
    "image": "images/d_batta.png",
    "file": "d_batta.png",
    "prompt": "A realistic-leaning educational picture book illustration of a bright green grasshopper with long powerful jumping hind legs, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "d_kamakiri",
    "name": "かまきり",
    "category": "doubutsu",
    "categoryName": "どうぶつ",
    "image": "images/d_kamakiri.png",
    "file": "d_kamakiri.png",
    "prompt": "A realistic-leaning educational picture book illustration of a praying mantis standing upright holding its spiked raptorial forelegs ready, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "d_hachi",
    "name": "はち",
    "category": "doubutsu",
    "categoryName": "どうぶつ",
    "image": "images/d_hachi.png",
    "file": "d_hachi.png",
    "prompt": "A realistic-leaning educational picture book illustration of a yellow and black striped bee flying near blossoms, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "d_ari",
    "name": "あり",
    "category": "doubutsu",
    "categoryName": "どうぶつ",
    "image": "images/d_ari.png",
    "file": "d_ari.png",
    "prompt": "A realistic-leaning educational picture book illustration of a busy little black worker ant walking with jointed legs and antennae, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "d_aomushi",
    "name": "あおむし",
    "category": "doubutsu",
    "categoryName": "どうぶつ",
    "image": "images/d_aomushi.png",
    "file": "d_aomushi.png",
    "prompt": "A realistic-leaning educational picture book illustration of a smooth green caterpillar munching on a fresh leaf, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "d_katatsumuri",
    "name": "かたつむり",
    "category": "doubutsu",
    "categoryName": "どうぶつ",
    "image": "images/d_katatsumuri.png",
    "file": "d_katatsumuri.png",
    "prompt": "A realistic-leaning educational picture book illustration of a cute garden snail with spiral shell and eye tentacles extended, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "d_dangomushi",
    "name": "だんごむし",
    "category": "doubutsu",
    "categoryName": "どうぶつ",
    "image": "images/d_dangomushi.png",
    "file": "d_dangomushi.png",
    "prompt": "A realistic-leaning educational picture book illustration of a segmented pill bug curled into a tight protective ball, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "t_ringo",
    "name": "りんご",
    "category": "tabemono",
    "categoryName": "たべもの",
    "image": "images/t_ringo.png",
    "file": "t_ringo.png",
    "prompt": "A realistic-leaning educational picture book illustration of fresh shiny red apple (りんご). Style: Gentle warm Japanese picture book style with delicate watercolor and colored pencil textures, subtle clear contours (bright red skin with subtle yellow speckles, green leaf on a short brown stem). Completely isolated on a solid pure white background (#ffffff) with no ground clutter, no background scenery, no props, no text, no watermarks, perfectly suited for a vocabulary flashcard for children. NOT a photograph, an illustration."
  },
  {
    "id": "t_banana",
    "name": "ばなな",
    "category": "tabemono",
    "categoryName": "たべもの",
    "image": "images/t_banana.png",
    "file": "t_banana.png",
    "prompt": "A realistic-leaning educational picture book illustration of bunch of two or three ripe yellow bananas (ばなな). Style: Gentle warm Japanese picture book style with delicate watercolor and colored pencil textures, subtle clear contours (bright yellow peel with subtle green tips, gentle curve). Completely isolated on a solid pure white background (#ffffff) with no ground clutter, no background scenery, no props, no text, no watermarks, perfectly suited for a vocabulary flashcard for children. NOT a photograph, an illustration."
  },
  {
    "id": "t_ichigo",
    "name": "いちご",
    "category": "tabemono",
    "categoryName": "たべもの",
    "image": "images/t_ichigo.png",
    "file": "t_ichigo.png",
    "prompt": "A realistic-leaning educational picture book illustration of fresh ripe red strawberry (いちご). Style: Gentle warm Japanese picture book style with delicate watercolor and colored pencil textures, subtle clear contours (vibrant red berry covered with tiny yellow seeds, fresh green calyx on top). Completely isolated on a solid pure white background (#ffffff) with no ground clutter, no background scenery, no props, no text, no watermarks, perfectly suited for a vocabulary flashcard for children. NOT a photograph, an illustration."
  },
  {
    "id": "t_mikan",
    "name": "みかん",
    "category": "tabemono",
    "categoryName": "たべもの",
    "image": "images/t_mikan.png",
    "file": "t_mikan.png",
    "prompt": "A realistic-leaning educational picture book illustration of juicy Japanese Satsuma mandarin orange (mikan) (みかん). Style: Gentle warm Japanese picture book style with delicate watercolor and colored pencil textures, subtle clear contours (bright orange textured peel, fresh green leaf on stem). Completely isolated on a solid pure white background (#ffffff) with no ground clutter, no background scenery, no props, no text, no watermarks, perfectly suited for a vocabulary flashcard for children. NOT a photograph, an illustration."
  },
  {
    "id": "t_budou",
    "name": "ぶどう",
    "category": "tabemono",
    "categoryName": "たべもの",
    "image": "images/t_budou.png",
    "file": "t_budou.png",
    "prompt": "A realistic-leaning educational picture book illustration of cluster of juicy purple grapes (ぶどう). Style: Gentle warm Japanese picture book style with delicate watercolor and colored pencil textures, subtle clear contours (rich deep purple-blue berries with natural gentle bloom, green vine leaf). Completely isolated on a solid pure white background (#ffffff) with no ground clutter, no background scenery, no props, no text, no watermarks, perfectly suited for a vocabulary flashcard for children. NOT a photograph, an illustration."
  },
  {
    "id": "t_suika",
    "name": "すいか",
    "category": "tabemono",
    "categoryName": "たべもの",
    "image": "images/t_suika.png",
    "file": "t_suika.png",
    "prompt": "A realistic-leaning educational picture book illustration of large round Japanese watermelon, whole or with a clean slice (すいか). Style: Gentle warm Japanese picture book style with delicate watercolor and colored pencil textures, subtle clear contours (bold green and black striped rind, crisp red flesh with black seeds). Completely isolated on a solid pure white background (#ffffff) with no ground clutter, no background scenery, no props, no text, no watermarks, perfectly suited for a vocabulary flashcard for children. NOT a photograph, an illustration."
  },
  {
    "id": "t_meron",
    "name": "めろん",
    "category": "tabemono",
    "categoryName": "たべもの",
    "image": "images/t_meron.png",
    "file": "t_meron.png",
    "prompt": "A realistic-leaning educational picture book illustration of a classic Japanese musk melon (マスクメロン / アールスメロン), perfectly round smooth spherical melon completely covered all over with uniform delicate white lace netting pattern, pale sage green skin, seamless smooth round sphere, authentic Japanese green muskmelon with a neat green T-shaped stem on top, whole uncut round fruit, unsegmented. Clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff)."
  },
  {
    "id": "t_momo",
    "name": "もも",
    "category": "tabemono",
    "categoryName": "たべもの",
    "image": "images/t_momo.png",
    "file": "t_momo.png",
    "prompt": "A realistic-leaning educational picture book illustration of a whole Japanese white peach fruit (日本の白桃), smooth velvety plump round peach, seamless unbroken skin with gentle natural pastel pink and creamy white gradient blush, very subtle shallow surface crease, intact unbroken smooth surface, small stem with a fresh green leaf, whole uncut fruit, solid round fruit. Clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff)."
  },
  {
    "id": "t_tomato",
    "name": "とまと",
    "category": "tabemono",
    "categoryName": "たべもの",
    "image": "images/t_tomato.png",
    "file": "t_tomato.png",
    "prompt": "A realistic-leaning educational picture book illustration of ripe plump red tomato (とまと). Style: Gentle warm Japanese picture book style with delicate watercolor and colored pencil textures, subtle clear contours (vibrant glossy red skin, green star-shaped calyx on top, succulent appearance). Completely isolated on a solid pure white background (#ffffff) with no ground clutter, no background scenery, no props, no text, no watermarks, perfectly suited for a vocabulary flashcard for children. NOT a photograph, an illustration."
  },
  {
    "id": "t_ninjin",
    "name": "にんじん",
    "category": "tabemono",
    "categoryName": "たべもの",
    "image": "images/t_ninjin.png",
    "file": "t_ninjin.png",
    "prompt": "A realistic-leaning educational picture book illustration of fresh crisp orange carrot (にんじん). Style: Gentle warm Japanese picture book style with delicate watercolor and colored pencil textures, subtle clear contours (tapered vibrant orange root with natural horizontal ridges, feathery green leafy top). Completely isolated on a solid pure white background (#ffffff) with no ground clutter, no background scenery, no props, no text, no watermarks, perfectly suited for a vocabulary flashcard for children. NOT a photograph, an illustration."
  },
  {
    "id": "t_tamago",
    "name": "たまご",
    "category": "tabemono",
    "categoryName": "たべもの",
    "image": "images/t_tamago.png",
    "file": "t_tamago.png",
    "prompt": "A realistic-leaning educational picture book illustration of fresh whole egg and a clean cracked egg showing golden yolk (たまご). Style: Gentle warm Japanese picture book style with delicate watercolor and colored pencil textures, subtle clear contours (smooth beige shell, bright round orange yolk and clear egg white). Completely isolated on a solid pure white background (#ffffff) with no ground clutter, no background scenery, no props, no text, no watermarks, perfectly suited for a vocabulary flashcard for children. NOT a photograph, an illustration."
  },
  {
    "id": "t_onigiri",
    "name": "おにぎり",
    "category": "tabemono",
    "categoryName": "たべもの",
    "image": "images/t_onigiri.png",
    "file": "t_onigiri.png",
    "prompt": "A realistic-leaning educational picture book illustration of traditional Japanese triangular rice ball (onigiri) (おにぎり). Style: Gentle warm Japanese picture book style with delicate watercolor and colored pencil textures, subtle clear contours (fluffy white rice grains, wrapped neatly with a dark green nori seaweed sheet). Completely isolated on a solid pure white background (#ffffff) with no ground clutter, no background scenery, no props, no text, no watermarks, perfectly suited for a vocabulary flashcard for children. NOT a photograph, an illustration."
  },
  {
    "id": "t_pan",
    "name": "ぱん",
    "category": "tabemono",
    "categoryName": "たべもの",
    "image": "images/t_pan.png",
    "file": "t_pan.png",
    "prompt": "A realistic-leaning educational picture book illustration of freshly baked loaf of sliced white bread (shokupan) (ぱん). Style: Gentle warm Japanese picture book style with delicate watercolor and colored pencil textures, subtle clear contours (golden brown crust, soft pillowy white center slice). Completely isolated on a solid pure white background (#ffffff) with no ground clutter, no background scenery, no props, no text, no watermarks, perfectly suited for a vocabulary flashcard for children. NOT a photograph, an illustration."
  },
  {
    "id": "t_kare-",
    "name": "かれー",
    "category": "tabemono",
    "categoryName": "たべもの",
    "image": "images/t_kare-.png",
    "file": "t_kare-.png",
    "prompt": "A realistic-leaning educational picture book illustration of plate of Japanese curry and rice (curry rice) (かれー). Style: Gentle warm Japanese picture book style with delicate watercolor and colored pencil textures, subtle clear contours (rich brown sauce with chunks of potato and carrot, fluffy white rice on an oval dish). Completely isolated on a solid pure white background (#ffffff) with no ground clutter, no background scenery, no props, no text, no watermarks, perfectly suited for a vocabulary flashcard for children. NOT a photograph, an illustration."
  },
  {
    "id": "t_ra-men",
    "name": "らーめん",
    "category": "tabemono",
    "categoryName": "たべもの",
    "image": "images/t_ra-men.png",
    "file": "t_ra-men.png",
    "prompt": "A realistic-leaning educational picture book illustration of steaming bowl of ramen noodle soup (らーめん). Style: Gentle warm Japanese picture book style with delicate watercolor and colored pencil textures, subtle clear contours (yellow curly noodles in clear soy broth, topped with chashu pork, boiled egg slice, nori, scallions). Completely isolated on a solid pure white background (#ffffff) with no ground clutter, no background scenery, no props, no text, no watermarks, perfectly suited for a vocabulary flashcard for children. NOT a photograph, an illustration."
  },
  {
    "id": "t_udon",
    "name": "うどん",
    "category": "tabemono",
    "categoryName": "たべもの",
    "image": "images/t_udon.png",
    "file": "t_udon.png",
    "prompt": "A realistic-leaning educational picture book illustration of bowl of hot Japanese udon noodle soup (うどん). Style: Gentle warm Japanese picture book style with delicate watercolor and colored pencil textures, subtle clear contours (thick white udon noodles in golden dashi broth, topped with green scallions and kamaboko fish cake). Completely isolated on a solid pure white background (#ffffff) with no ground clutter, no background scenery, no props, no text, no watermarks, perfectly suited for a vocabulary flashcard for children. NOT a photograph, an illustration."
  },
  {
    "id": "t_ke-ki",
    "name": "けーき",
    "category": "tabemono",
    "categoryName": "たべもの",
    "image": "images/t_ke-ki.png",
    "file": "t_ke-ki.png",
    "prompt": "A realistic-leaning educational picture book illustration of slice of Japanese strawberry shortcake (けーき). Style: Gentle warm Japanese picture book style with delicate watercolor and colored pencil textures, subtle clear contours (soft fluffy sponge cake, layers of white fresh whipped cream, crowned with a bright red strawberry). Completely isolated on a solid pure white background (#ffffff) with no ground clutter, no background scenery, no props, no text, no watermarks, perfectly suited for a vocabulary flashcard for children. NOT a photograph, an illustration."
  },
  {
    "id": "t_purin",
    "name": "ぷりん",
    "category": "tabemono",
    "categoryName": "たべもの",
    "image": "images/t_purin.png",
    "file": "t_purin.png",
    "prompt": "A realistic-leaning educational picture book illustration of traditional Japanese custard pudding (purin) (ぷりん). Style: Gentle warm Japanese picture book style with delicate watercolor and colored pencil textures, subtle clear contours (glossy caramel sauce dripping over smooth yellow egg custard on a small plate, topped with a cherry). Completely isolated on a solid pure white background (#ffffff) with no ground clutter, no background scenery, no props, no text, no watermarks, perfectly suited for a vocabulary flashcard for children. NOT a photograph, an illustration."
  },
  {
    "id": "t_aisu",
    "name": "あいす",
    "category": "tabemono",
    "categoryName": "たべもの",
    "image": "images/t_aisu.png",
    "file": "t_aisu.png",
    "prompt": "A realistic-leaning educational picture book illustration of soft serve or scooped ice cream in a crisp wafer cone (あいす). Style: Gentle warm Japanese picture book style with delicate watercolor and colored pencil textures, subtle clear contours (swirled creamy vanilla ice cream with delicious texture). Completely isolated on a solid pure white background (#ffffff) with no ground clutter, no background scenery, no props, no text, no watermarks, perfectly suited for a vocabulary flashcard for children. NOT a photograph, an illustration."
  },
  {
    "id": "t_chokore-to",
    "name": "ちょこれーと",
    "category": "tabemono",
    "categoryName": "たべもの",
    "image": "images/t_chokore-to.png",
    "file": "t_chokore-to.png",
    "prompt": "A realistic-leaning educational picture book illustration of a bar of chocolate partially unwrapped in silver foil (ちょこれーと). Style: Gentle warm Japanese picture book style with delicate watercolor and colored pencil textures, subtle clear contours (glossy brown segmented chocolate blocks, crinkled foil wrapper). Completely isolated on a solid pure white background (#ffffff) with no clutter, suitable for children vocabulary flashcard. NOT a photograph, an illustration."
  },
  {
    "id": "t_ju-su",
    "name": "じゅーす",
    "category": "tabemono",
    "categoryName": "たべもの",
    "image": "images/t_ju-su.png",
    "file": "t_ju-su.png",
    "prompt": "A realistic-leaning educational picture book illustration of a glass of fresh orange juice with a straw (じゅーす). Style: Gentle warm Japanese picture book style with delicate watercolor and colored pencil textures, subtle clear contours (clear glass tumbler, bright sunny orange juice, red-striped straw). Completely isolated on a solid pure white background (#ffffff) with no clutter, suitable for children vocabulary flashcard. NOT a photograph, an illustration."
  },
  {
    "id": "t_gyuunyuu",
    "name": "ぎゅうにゅう",
    "category": "tabemono",
    "categoryName": "たべもの",
    "image": "images/t_gyuunyuu.png",
    "file": "t_gyuunyuu.png",
    "prompt": "A realistic-leaning educational picture book illustration of a classic paper milk carton pack (ぎゅうにゅう). Style: Gentle warm Japanese picture book style with delicate watercolor and colored pencil textures, subtle clear contours (blue and white carton gable-top design, milk drop icon). Completely isolated on a solid pure white background (#ffffff) with no clutter, suitable for children vocabulary flashcard. NOT a photograph, an illustration."
  },
  {
    "id": "t_sakuranbo",
    "name": "さくらんぼ",
    "category": "tabemono",
    "categoryName": "たべもの",
    "image": "images/t_sakuranbo.png",
    "file": "t_sakuranbo.png",
    "prompt": "A realistic-leaning educational picture book illustration of a pair of glossy bright red cherries connected by thin green stems with a green leaf, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "t_nashi",
    "name": "なし",
    "category": "tabemono",
    "categoryName": "たべもの",
    "image": "images/t_nashi.png",
    "file": "t_nashi.png",
    "prompt": "A realistic-leaning educational picture book illustration of a round Japanese russet Asian pear with textured golden-brown skin, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "t_kaki",
    "name": "かき",
    "category": "tabemono",
    "categoryName": "たべもの",
    "image": "images/t_kaki.png",
    "file": "t_kaki.png",
    "prompt": "A realistic-leaning educational picture book illustration of a ripe orange Japanese persimmon fruit with four green calyx leaves on top, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "t_kuri",
    "name": "くり",
    "category": "tabemono",
    "categoryName": "たべもの",
    "image": "images/t_kuri.png",
    "file": "t_kuri.png",
    "prompt": "A realistic-leaning educational picture book illustration of a glossy brown chestnut nut with prickly green outer burr husk open slightly, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "t_mango-",
    "name": "まんごー",
    "category": "tabemono",
    "categoryName": "たべもの",
    "image": "images/t_mango-.png",
    "file": "t_mango-.png",
    "prompt": "A realistic-leaning educational picture book illustration of a ripe tropical mango with rich red, orange, and golden skin, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "t_painappuru",
    "name": "ぱいなっぷる",
    "category": "tabemono",
    "categoryName": "たべもの",
    "image": "images/t_painappuru.png",
    "file": "t_painappuru.png",
    "prompt": "A realistic-leaning educational picture book illustration of a whole fresh pineapple with textured golden diamond skin and spiky green crown leaves, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "t_kiui",
    "name": "きういふるーつ",
    "category": "tabemono",
    "categoryName": "たべもの",
    "image": "images/t_kiui.png",
    "file": "t_kiui.png",
    "prompt": "A realistic-leaning educational picture book illustration of a fuzzy brown kiwi fruit with small green stem cut slightly to show emerald green flesh and black seeds, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "t_remon",
    "name": "れもん",
    "category": "tabemono",
    "categoryName": "たべもの",
    "image": "images/t_remon.png",
    "file": "t_remon.png",
    "prompt": "A realistic-leaning educational picture book illustration of a bright vibrant yellow oval lemon fruit with small green leaf, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "t_kyabetsu",
    "name": "きゃべつ",
    "category": "tabemono",
    "categoryName": "たべもの",
    "image": "images/t_kyabetsu.png",
    "file": "t_kyabetsu.png",
    "prompt": "A realistic-leaning educational picture book illustration of a fresh round head of light green cabbage with crinkled outer leaves, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "t_retasu",
    "name": "れたす",
    "category": "tabemono",
    "categoryName": "たべもの",
    "image": "images/t_retasu.png",
    "file": "t_retasu.png",
    "prompt": "A realistic-leaning educational picture book illustration of a head of crisp curly iceberg lettuce with ruffled pale green leaves, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "t_hakusai",
    "name": "はくさい",
    "category": "tabemono",
    "categoryName": "たべもの",
    "image": "images/t_hakusai.png",
    "file": "t_hakusai.png",
    "prompt": "A realistic-leaning educational picture book illustration of a tall Chinese napa cabbage with pale ivory ribs and crinkly green leaf tips, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "t_hourensou",
    "name": "ほうれんそう",
    "category": "tabemono",
    "categoryName": "たべもの",
    "image": "images/t_hourensou.png",
    "file": "t_hourensou.png",
    "prompt": "A realistic-leaning educational picture book illustration of a bunch of dark green spinach leaves with pinkish-red root base, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "t_negi",
    "name": "ねぎ",
    "category": "tabemono",
    "categoryName": "たべもの",
    "image": "images/t_negi.png",
    "file": "t_negi.png",
    "prompt": "A realistic-leaning educational picture book illustration of a bundle of Japanese green scallions / green onions, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "t_tamanegi",
    "name": "たまねぎ",
    "category": "tabemono",
    "categoryName": "たべもの",
    "image": "images/t_tamanegi.png",
    "file": "t_tamanegi.png",
    "prompt": "A realistic-leaning educational picture book illustration of a round golden-brown onion with papery outer skin, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "t_jagaimo",
    "name": "じゃがいも",
    "category": "tabemono",
    "categoryName": "たべもの",
    "image": "images/t_jagaimo.png",
    "file": "t_jagaimo.png",
    "prompt": "A realistic-leaning educational picture book illustration of a wholesome earthy brown potato with smooth skin and small eyes, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "t_satsumaimo",
    "name": "さつまいも",
    "category": "tabemono",
    "categoryName": "たべもの",
    "image": "images/t_satsumaimo.png",
    "file": "t_satsumaimo.png",
    "prompt": "A realistic-leaning educational picture book illustration of a Japanese sweet potato with rich reddish-purple skin and tapered ends, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "t_daikon",
    "name": "だいこん",
    "category": "tabemono",
    "categoryName": "たべもの",
    "image": "images/t_daikon.png",
    "file": "t_daikon.png",
    "prompt": "A realistic-leaning educational picture book illustration of a long straight white Japanese daikon radish with fresh green leafy top, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "t_renkon",
    "name": "れんこん",
    "category": "tabemono",
    "categoryName": "たべもの",
    "image": "images/t_renkon.png",
    "file": "t_renkon.png",
    "prompt": "A realistic-leaning educational picture book illustration of a Japanese lotus root (renkon) with distinctive hollow holes pattern, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "t_takenoko",
    "name": "たけのこ",
    "category": "tabemono",
    "categoryName": "たべもの",
    "image": "images/t_takenoko.png",
    "file": "t_takenoko.png",
    "prompt": "A realistic-leaning educational picture book illustration of a cone-shaped fresh bamboo shoot with brown overlapping fibrous husks, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "t_kyuuri",
    "name": "きゅうり",
    "category": "tabemono",
    "categoryName": "たべもの",
    "image": "images/t_kyuuri.png",
    "file": "t_kyuuri.png",
    "prompt": "A realistic-leaning educational picture book illustration of a slender dark green Japanese cucumber with subtle prickly bumps, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "t_nasu",
    "name": "なす",
    "category": "tabemono",
    "categoryName": "たべもの",
    "image": "images/t_nasu.png",
    "file": "t_nasu.png",
    "prompt": "A realistic-leaning educational picture book illustration of a glossy deep purple Japanese eggplant with green calyx stem, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "t_pi-man",
    "name": "ぴーまん",
    "category": "tabemono",
    "categoryName": "たべもの",
    "image": "images/t_pi-man.png",
    "file": "t_pi-man.png",
    "prompt": "A realistic-leaning educational picture book illustration of a glossy green bell pepper (piman) with four lobes, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "t_kabocha",
    "name": "かぼちゃ",
    "category": "tabemono",
    "categoryName": "たべもの",
    "image": "images/t_kabocha.png",
    "file": "t_kabocha.png",
    "prompt": "A realistic-leaning educational picture book illustration of a dark green Japanese kabocha squash with mottled skin and thick woody stem, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "t_toumorokoshi",
    "name": "とうもろこし",
    "category": "tabemono",
    "categoryName": "たべもの",
    "image": "images/t_toumorokoshi.png",
    "file": "t_toumorokoshi.png",
    "prompt": "A realistic-leaning educational picture book illustration of an ear of sweet yellow corn with green husks peeled back slightly, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "t_edamame",
    "name": "えだまめ",
    "category": "tabemono",
    "categoryName": "たべもの",
    "image": "images/t_edamame.png",
    "file": "t_edamame.png",
    "prompt": "A realistic-leaning educational picture book illustration of a cluster of fuzzy green edamame soybean pods, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "t_moyashi",
    "name": "もやし",
    "category": "tabemono",
    "categoryName": "たべもの",
    "image": "images/t_moyashi.png",
    "file": "t_moyashi.png",
    "prompt": "A realistic-leaning educational picture book illustration of a tangle of crisp white bean sprouts with tiny yellow heads, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "t_burokkori-",
    "name": "ぶろっこりー",
    "category": "tabemono",
    "categoryName": "たべもの",
    "image": "images/t_burokkori-.png",
    "file": "t_burokkori-.png",
    "prompt": "A realistic-leaning educational picture book illustration of a fresh green broccoli head with tight florets and thick stem, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "t_shiitake",
    "name": "しいたけ",
    "category": "tabemono",
    "categoryName": "たべもの",
    "image": "images/t_shiitake.png",
    "file": "t_shiitake.png",
    "prompt": "A realistic-leaning educational picture book illustration of a fresh brown Japanese shiitake mushroom with thick stem and velvety cap, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "t_gohan",
    "name": "ごはん",
    "category": "tabemono",
    "categoryName": "たべもの",
    "image": "images/t_gohan.png",
    "file": "t_gohan.png",
    "prompt": "A realistic-leaning educational picture book illustration of a porcelain bowl filled with fluffy freshly steamed white Japanese rice, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "t_cha-han",
    "name": "ちゃーはん",
    "category": "tabemono",
    "categoryName": "たべもの",
    "image": "images/t_cha-han.png",
    "file": "t_cha-han.png",
    "prompt": "A realistic-leaning educational picture book illustration of a plate of golden Chinese fried rice with green onions, scrambled eggs, and roast pork, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "t_omuraisu",
    "name": "おむらいす",
    "category": "tabemono",
    "categoryName": "たべもの",
    "image": "images/t_omuraisu.png",
    "file": "t_omuraisu.png",
    "prompt": "A realistic-leaning educational picture book illustration of a classic Japanese omurice with smooth yellow egg crepe envelope and ketchup drizzle, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "t_to-suto",
    "name": "とーすと",
    "category": "tabemono",
    "categoryName": "たべもの",
    "image": "images/t_to-suto.png",
    "file": "t_to-suto.png",
    "prompt": "A realistic-leaning educational picture book illustration of a slice of golden toasted Japanese white bread with a melting pat of yellow butter, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "t_sandoicchi",
    "name": "さんどいっち",
    "category": "tabemono",
    "categoryName": "たべもの",
    "image": "images/t_sandoicchi.png",
    "file": "t_sandoicchi.png",
    "prompt": "A realistic-leaning educational picture book illustration of a pair of triangle cut sandwiches filled with egg salad, ham, and lettuce, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "t_hottodoggu",
    "name": "ほっとどっぐ",
    "category": "tabemono",
    "categoryName": "たべもの",
    "image": "images/t_hottodoggu.png",
    "file": "t_hottodoggu.png",
    "prompt": "A realistic-leaning educational picture book illustration of a hot dog in a soft bun topped with mustard and ketchup swirl, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "t_hanba-ga-",
    "name": "はんばーがー",
    "category": "tabemono",
    "categoryName": "たべもの",
    "image": "images/t_hanba-ga-.png",
    "file": "t_hanba-ga-.png",
    "prompt": "A realistic-leaning educational picture book illustration of a juicy hamburger with sesame seed bun, beef patty, cheese, and lettuce, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "t_soba",
    "name": "そば",
    "category": "tabemono",
    "categoryName": "たべもの",
    "image": "images/t_soba.png",
    "file": "t_soba.png",
    "prompt": "A realistic-leaning educational picture book illustration of a traditional bamboo tray (zaru) of cold Japanese buckwheat soba noodles with dipping sauce cup, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "t_yakisoba",
    "name": "やきそば",
    "category": "tabemono",
    "categoryName": "たべもの",
    "image": "images/t_yakisoba.png",
    "file": "t_yakisoba.png",
    "prompt": "A realistic-leaning educational picture book illustration of a plate of stir-fried Japanese yakisoba noodles topped with red pickled ginger and aonori, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "t_supagetti",
    "name": "すぱげってぃ",
    "category": "tabemono",
    "categoryName": "たべもの",
    "image": "images/t_supagetti.png",
    "file": "t_supagetti.png",
    "prompt": "A realistic-leaning educational picture book illustration of a plate of spaghetti pasta with rich red meat sauce bolognese and herb garnish, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "t_sushi",
    "name": "すし",
    "category": "tabemono",
    "categoryName": "たべもの",
    "image": "images/t_sushi.png",
    "file": "t_sushi.png",
    "prompt": "A realistic-leaning educational picture book illustration of an elegant platter of assorted nigiri sushi including tuna, salmon, and egg on seasoned rice, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "t_sashimi",
    "name": "さしみ",
    "category": "tabemono",
    "categoryName": "たべもの",
    "image": "images/t_sashimi.png",
    "file": "t_sashimi.png",
    "prompt": "A realistic-leaning educational picture book illustration of a fresh delicate arrangement of raw fish sashimi slices with wasabi and shiso leaf, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "t_hanba-gu",
    "name": "はんばーぐ",
    "category": "tabemono",
    "categoryName": "たべもの",
    "image": "images/t_hanba-gu.png",
    "file": "t_hanba-gu.png",
    "prompt": "A realistic-leaning educational picture book illustration of a plump Japanese hamburger steak drizzled with rich brown demi-glace sauce, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "t_karaage",
    "name": "からあげ",
    "category": "tabemono",
    "categoryName": "たべもの",
    "image": "images/t_karaage.png",
    "file": "t_karaage.png",
    "prompt": "A realistic-leaning educational picture book illustration of a plate of crispy golden Japanese fried chicken (karaage) nuggets with lemon wedge, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "t_tonkatsu",
    "name": "とんかつ",
    "category": "tabemono",
    "categoryName": "たべもの",
    "image": "images/t_tonkatsu.png",
    "file": "t_tonkatsu.png",
    "prompt": "A realistic-leaning educational picture book illustration of a crispy golden panko-breaded pork cutlet (tonkatsu) sliced neatly on shredded cabbage, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "t_ebifurai",
    "name": "えびふらい",
    "category": "tabemono",
    "categoryName": "たべもの",
    "image": "images/t_ebifurai.png",
    "file": "t_ebifurai.png",
    "prompt": "A realistic-leaning educational picture book illustration of a pair of crispy breaded fried shrimp (ebi fry) with tartar sauce and lemon, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "t_korokke",
    "name": "ころっけ",
    "category": "tabemono",
    "categoryName": "たべもの",
    "image": "images/t_korokke.png",
    "file": "t_korokke.png",
    "prompt": "A realistic-leaning educational picture book illustration of a golden oval potato croquette with crispy panko coating, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "t_gyouza",
    "name": "ぎょうざ",
    "category": "tabemono",
    "categoryName": "たべもの",
    "image": "images/t_gyouza.png",
    "file": "t_gyouza.png",
    "prompt": "A realistic-leaning educational picture book illustration of a neat row of pan-fried Japanese gyoza dumplings with crispy golden-brown bottom, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "t_shuumai",
    "name": "しゅうまい",
    "category": "tabemono",
    "categoryName": "たべもの",
    "image": "images/t_shuumai.png",
    "file": "t_shuumai.png",
    "prompt": "A realistic-leaning educational picture book illustration of steamed pork shumai dumplings with green peas on top, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "t_nikujaga",
    "name": "にくじゃが",
    "category": "tabemono",
    "categoryName": "たべもの",
    "image": "images/t_nikujaga.png",
    "file": "t_nikujaga.png",
    "prompt": "A realistic-leaning educational picture book illustration of a home-cooked Japanese stew of simmered beef, potatoes, carrots, and onions (nikujaga), clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "t_yakitori",
    "name": "やきとり",
    "category": "tabemono",
    "categoryName": "たべもの",
    "image": "images/t_yakitori.png",
    "file": "t_yakitori.png",
    "prompt": "A realistic-leaning educational picture book illustration of skewers of grilled Japanese chicken yakitori with glossy tare glaze, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "t_oden",
    "name": "おでん",
    "category": "tabemono",
    "categoryName": "たべもの",
    "image": "images/t_oden.png",
    "file": "t_oden.png",
    "prompt": "A realistic-leaning educational picture book illustration of a steaming pot of Japanese oden stew with daikon radish, boiled egg, and fish cake, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "t_takoyaki",
    "name": "たこやき",
    "category": "tabemono",
    "categoryName": "たべもの",
    "image": "images/t_takoyaki.png",
    "file": "t_takoyaki.png",
    "prompt": "A realistic-leaning educational picture book illustration of a boat tray of round golden takoyaki octopus balls with brown sauce, mayonnaise, and bonito flakes, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "t_okonomiyaki",
    "name": "おこのみやき",
    "category": "tabemono",
    "categoryName": "たべもの",
    "image": "images/t_okonomiyaki.png",
    "file": "t_okonomiyaki.png",
    "prompt": "A realistic-leaning educational picture book illustration of a savory Japanese cabbage okonomiyaki pancake with crisscross mayo, sweet brown sauce, and seaweed flakes, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "t_taiyaki",
    "name": "たいやき",
    "category": "tabemono",
    "categoryName": "たべもの",
    "image": "images/t_taiyaki.png",
    "file": "t_taiyaki.png",
    "prompt": "A realistic-leaning educational picture book illustration of a fish-shaped Japanese taiyaki waffle pastry with sweet red bean paste filling, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "t_yakizakana",
    "name": "やきざかな",
    "category": "tabemono",
    "categoryName": "たべもの",
    "image": "images/t_yakizakana.png",
    "file": "t_yakizakana.png",
    "prompt": "A realistic-leaning educational picture book illustration of a grilled whole fish with crispy salted skin and grated daikon radish, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "t_tamagoyaki",
    "name": "たまごやき",
    "category": "tabemono",
    "categoryName": "たべもの",
    "image": "images/t_tamagoyaki.png",
    "file": "t_tamagoyaki.png",
    "prompt": "A realistic-leaning educational picture book illustration of a sliced block of sweet Japanese rolled yellow omelet (tamagoyaki), clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "t_medamayaki",
    "name": "めだまやき",
    "category": "tabemono",
    "categoryName": "たべもの",
    "image": "images/t_medamayaki.png",
    "file": "t_medamayaki.png",
    "prompt": "A realistic-leaning educational picture book illustration of a perfect sunny-side up fried egg with bright yellow yolk and crisp white edges, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "t_nattou",
    "name": "なっとう",
    "category": "tabemono",
    "categoryName": "たべもの",
    "image": "images/t_nattou.png",
    "file": "t_nattou.png",
    "prompt": "A realistic-leaning educational picture book illustration of a pack of fermented Japanese natto beans stirred with froth and green onions, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "t_toufu",
    "name": "とうふ",
    "category": "tabemono",
    "categoryName": "たべもの",
    "image": "images/t_toufu.png",
    "file": "t_toufu.png",
    "prompt": "A realistic-leaning educational picture book illustration of a block of silky white Japanese chilled tofu (hiyayakko) topped with grated ginger and green onions, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "t_misoshiru",
    "name": "みそしる",
    "category": "tabemono",
    "categoryName": "たべもの",
    "image": "images/t_misoshiru.png",
    "file": "t_misoshiru.png",
    "prompt": "A realistic-leaning educational picture book illustration of a Japanese wooden soup bowl of warm miso soup with tofu cubes and seaweed, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "t_su-pu",
    "name": "すーぷ",
    "category": "tabemono",
    "categoryName": "たべもの",
    "image": "images/t_su-pu.png",
    "file": "t_su-pu.png",
    "prompt": "A realistic-leaning educational picture book illustration of a ceramic bowl of warm vegetable broth soup, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "t_sarada",
    "name": "さらだ",
    "category": "tabemono",
    "categoryName": "たべもの",
    "image": "images/t_sarada.png",
    "file": "t_sarada.png",
    "prompt": "A realistic-leaning educational picture book illustration of a colorful garden salad bowl with lettuce, cherry tomatoes, and cucumber, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "t_uinna-",
    "name": "ういんなー",
    "category": "tabemono",
    "categoryName": "たべもの",
    "image": "images/t_uinna-.png",
    "file": "t_uinna-.png",
    "prompt": "A realistic-leaning educational picture book illustration of a pair of red-skinned Japanese sausage wieners sliced with octopus tentacles, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "t_hamu",
    "name": "はむ",
    "category": "tabemono",
    "categoryName": "たべもの",
    "image": "images/t_hamu.png",
    "file": "t_hamu.png",
    "prompt": "A realistic-leaning educational picture book illustration of neat slices of pink deli ham laid out, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "t_chi-zu",
    "name": "ちーず",
    "category": "tabemono",
    "categoryName": "たべもの",
    "image": "images/t_chi-zu.png",
    "file": "t_chi-zu.png",
    "prompt": "A realistic-leaning educational picture book illustration of a yellow wedge of Swiss cheese with natural holes, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "t_piza",
    "name": "ぴざ",
    "category": "tabemono",
    "categoryName": "たべもの",
    "image": "images/t_piza.png",
    "file": "t_piza.png",
    "prompt": "A realistic-leaning educational picture book illustration of a whole round baked Italian pizza topped with melted cheese, tomato sauce, and basil, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "t_kukki-",
    "name": "くっきー",
    "category": "tabemono",
    "categoryName": "たべもの",
    "image": "images/t_kukki-.png",
    "file": "t_kukki-.png",
    "prompt": "A realistic-leaning educational picture book illustration of a plate of baked butter cookies with chocolate chips, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "t_senbei",
    "name": "せんべい",
    "category": "tabemono",
    "categoryName": "たべもの",
    "image": "images/t_senbei.png",
    "file": "t_senbei.png",
    "prompt": "A realistic-leaning educational picture book illustration of a traditional round Japanese soy sauce rice cracker (senbei) with a strip of nori seaweed, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "t_potetochippusu",
    "name": "ぽてとちっぷす",
    "category": "tabemono",
    "categoryName": "たべもの",
    "image": "images/t_potetochippusu.png",
    "file": "t_potetochippusu.png",
    "prompt": "A realistic-leaning educational picture book illustration of a bowl of golden crispy thin-cut salted potato chips, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "t_poppuko-n",
    "name": "ぽっぷこーん",
    "category": "tabemono",
    "categoryName": "たべもの",
    "image": "images/t_poppuko-n.png",
    "file": "t_poppuko-n.png",
    "prompt": "A realistic-leaning educational picture book illustration of a striped paper bucket overflowing with fluffy buttered popcorn, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "t_do-natsu",
    "name": "どーなつ",
    "category": "tabemono",
    "categoryName": "たべもの",
    "image": "images/t_do-natsu.png",
    "file": "t_do-natsu.png",
    "prompt": "A realistic-leaning educational picture book illustration of a round ring donut with sweet pink strawberry glaze and sprinkles, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "t_pafe",
    "name": "ぱふぇ",
    "category": "tabemono",
    "categoryName": "たべもの",
    "image": "images/t_pafe.png",
    "file": "t_pafe.png",
    "prompt": "A realistic-leaning educational picture book illustration of a tall glass of fruit parfait with vanilla soft serve, strawberries, and wafers, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "t_kure-pu",
    "name": "くれーぷ",
    "category": "tabemono",
    "categoryName": "たべもの",
    "image": "images/t_kure-pu.png",
    "file": "t_kure-pu.png",
    "prompt": "A realistic-leaning educational picture book illustration of a rolled French crepe cone filled with whipped cream, banana slices, and chocolate sauce, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "t_hottoke-ki",
    "name": "ほっとけーき",
    "category": "tabemono",
    "categoryName": "たべもの",
    "image": "images/t_hottoke-ki.png",
    "file": "t_hottoke-ki.png",
    "prompt": "A realistic-leaning educational picture book illustration of a stack of fluffy golden Japanese pancakes topped with a cube of melting butter and maple syrup drizzle, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "t_shu-kuri-mu",
    "name": "しゅーくりーむ",
    "category": "tabemono",
    "categoryName": "たべもの",
    "image": "images/t_shu-kuri-mu.png",
    "file": "t_shu-kuri-mu.png",
    "prompt": "A realistic-leaning educational picture book illustration of a round French choux cream puff overflowing with rich custard and whipped cream, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "t_zeri-",
    "name": "ぜりー",
    "category": "tabemono",
    "categoryName": "たべもの",
    "image": "images/t_zeri-.png",
    "file": "t_zeri-.png",
    "prompt": "A realistic-leaning educational picture book illustration of a translucent shimmering orange fruit jelly in a glass cup, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "t_kyandi",
    "name": "きゃんでぃ",
    "category": "tabemono",
    "categoryName": "たべもの",
    "image": "images/t_kyandi.png",
    "file": "t_kyandi.png",
    "prompt": "A realistic-leaning educational picture book illustration of an assortment of shiny colorful wrapped hard candy drops, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "t_dango",
    "name": "だんご",
    "category": "tabemono",
    "categoryName": "たべもの",
    "image": "images/t_dango.png",
    "file": "t_dango.png",
    "prompt": "A realistic-leaning educational picture book illustration of a skewer of three colorful Sanshoku dango rice balls (pink, white, green), clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "t_dorayaki",
    "name": "どらやき",
    "category": "tabemono",
    "categoryName": "たべもの",
    "image": "images/t_dorayaki.png",
    "file": "t_dorayaki.png",
    "prompt": "A realistic-leaning educational picture book illustration of a pair of Japanese pancake-like dorayaki patties sandwiched with sweet red bean paste, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "t_kakigoori",
    "name": "かきごおり",
    "category": "tabemono",
    "categoryName": "たべもの",
    "image": "images/t_kakigoori.png",
    "file": "t_kakigoori.png",
    "prompt": "A realistic-leaning educational picture book illustration of a bowl of finely shaved ice dessert topped with vibrant red strawberry syrup and sweet condensed milk, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "t_wataame",
    "name": "わたあめ",
    "category": "tabemono",
    "categoryName": "たべもの",
    "image": "images/t_wataame.png",
    "file": "t_wataame.png",
    "prompt": "A realistic-leaning educational picture book illustration of a fluffy cloud-like ball of pink cotton candy on a paper stick, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "t_gumi",
    "name": "ぐみ",
    "category": "tabemono",
    "categoryName": "たべもの",
    "image": "images/t_gumi.png",
    "file": "t_gumi.png",
    "prompt": "A realistic-leaning educational picture book illustration of colorful chewy gummy bear candies, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "t_softokuri-mu",
    "name": "そふとくりーむ",
    "category": "tabemono",
    "categoryName": "たべもの",
    "image": "images/t_softokuri-mu.png",
    "file": "t_softokuri-mu.png",
    "prompt": "A realistic-leaning educational picture book illustration of a swirl of creamy white vanilla soft serve ice cream in a golden waffle cone, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "t_mizu",
    "name": "みず",
    "category": "tabemono",
    "categoryName": "たべもの",
    "image": "images/t_mizu.png",
    "file": "t_mizu.png",
    "prompt": "A realistic-leaning educational picture book illustration of a clear glass filled with pure refreshing water with small ice cubes, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "t_ocha",
    "name": "おちゃ",
    "category": "tabemono",
    "categoryName": "たべもの",
    "image": "images/t_ocha.png",
    "file": "t_ocha.png",
    "prompt": "A realistic-leaning educational picture book illustration of a traditional Japanese ceramic teacup filled with steaming green sencha tea, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "t_mugicha",
    "name": "むぎちゃ",
    "category": "tabemono",
    "categoryName": "たべもの",
    "image": "images/t_mugicha.png",
    "file": "t_mugicha.png",
    "prompt": "A realistic-leaning educational picture book illustration of a tall glass of cold roasted barley tea (mugicha) with ice cubes, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "t_ko-cha",
    "name": "こーちゃ",
    "category": "tabemono",
    "categoryName": "たべもの",
    "image": "images/t_ko-cha.png",
    "file": "t_ko-cha.png",
    "prompt": "A realistic-leaning educational picture book illustration of a delicate porcelain teacup of clear amber black tea with lemon slice, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "t_ko-hi-",
    "name": "こーひー",
    "category": "tabemono",
    "categoryName": "たべもの",
    "image": "images/t_ko-hi-.png",
    "file": "t_ko-hi-.png",
    "prompt": "A realistic-leaning educational picture book illustration of a classic white ceramic mug filled with aromatic black hot coffee, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "t_kokoa",
    "name": "ここあ",
    "category": "tabemono",
    "categoryName": "たべもの",
    "image": "images/t_kokoa.png",
    "file": "t_kokoa.png",
    "prompt": "A realistic-leaning educational picture book illustration of a cozy mug of warm hot cocoa topped with fluffy mini marshmallows, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "t_ko-ra",
    "name": "こーら",
    "category": "tabemono",
    "categoryName": "たべもの",
    "image": "images/t_ko-ra.png",
    "file": "t_ko-ra.png",
    "prompt": "A realistic-leaning educational picture book illustration of a tall glass of fizzy dark cola with ice cubes and lemon slice, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "t_kuri-muso-da",
    "name": "くりーむそーだ",
    "category": "tabemono",
    "categoryName": "たべもの",
    "image": "images/t_kuri-muso-da.png",
    "file": "t_kuri-muso-da.png",
    "prompt": "A realistic-leaning educational picture book illustration of a retro Japanese cafe emerald green melon soda topped with a scoop of vanilla ice cream and bright red cherry, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "n_kuruma",
    "name": "くるま",
    "category": "norimono",
    "categoryName": "のりもの",
    "image": "images/n_kuruma.png",
    "file": "n_kuruma.png",
    "prompt": "A realistic-leaning educational picture book illustration of compact red passenger car (くるま). Style: Gentle warm Japanese picture book style with delicate watercolor and colored pencil textures, subtle clear contours (clean smooth body, transparent windows, two black wheels, headlights). Completely isolated on a solid pure white background (#ffffff) with no ground clutter, no background scenery, no props, no text, no watermarks, perfectly suited for a vocabulary flashcard for children. NOT a photograph, an illustration."
  },
  {
    "id": "n_jitensha",
    "name": "じてんしゃ",
    "category": "norimono",
    "categoryName": "のりもの",
    "image": "images/n_jitensha.png",
    "file": "n_jitensha.png",
    "prompt": "A realistic-leaning educational picture book illustration of cheerful bicycle with basket (じてんしゃ). Style: Gentle warm Japanese picture book style with delicate watercolor and colored pencil textures, subtle clear contours (two spoked wheels, handlebars with bell, comfortable seat, front wire basket, chain pedals). Completely isolated on a solid pure white background (#ffffff) with no ground clutter, no background scenery, no props, no text, no watermarks, perfectly suited for a vocabulary flashcard for children. NOT a photograph, an illustration."
  },
  {
    "id": "n_baiku",
    "name": "ばいく",
    "category": "norimono",
    "categoryName": "のりもの",
    "image": "images/n_baiku.png",
    "file": "n_baiku.png",
    "prompt": "A realistic-leaning educational picture book illustration of friendly motorcycle / scooter (ばいく). Style: Gentle warm Japanese picture book style with delicate watercolor and colored pencil textures, subtle clear contours (two wheels, handlebars, headlight, comfortable seat and mirror). Completely isolated on a solid pure white background (#ffffff) with no ground clutter, no background scenery, no props, no text, no watermarks, perfectly suited for a vocabulary flashcard for children. NOT a photograph, an illustration."
  },
  {
    "id": "n_basu",
    "name": "ばす",
    "category": "norimono",
    "categoryName": "のりもの",
    "image": "images/n_basu.png",
    "file": "n_basu.png",
    "prompt": "A realistic-leaning educational picture book illustration of friendly city bus in yellow or green (ばす). Style: Gentle warm Japanese picture book style with delicate watercolor and colored pencil textures, subtle clear contours (rectangular body, multiple passenger windows, destination display, front windshield). Completely isolated on a solid pure white background (#ffffff) with no ground clutter, no background scenery, no props, no text, no watermarks, perfectly suited for a vocabulary flashcard for children. NOT a photograph, an illustration."
  },
  {
    "id": "n_takushi-",
    "name": "たくしー",
    "category": "norimono",
    "categoryName": "のりもの",
    "image": "images/n_takushi-.png",
    "file": "n_takushi-.png",
    "prompt": "A realistic-leaning educational picture book illustration of a Japanese city taxi (たくしー). Style: Gentle warm Japanese picture book style with delicate watercolor and colored pencil textures, subtle clear contours (yellow or black passenger car body, illuminated roof dome sign, green side stripe, clean passenger windows). Completely isolated on a solid pure white background (#ffffff) with no clutter, suitable for children vocabulary flashcard. NOT a photograph, an illustration."
  },
  {
    "id": "n_torakku",
    "name": "とらっく",
    "category": "norimono",
    "categoryName": "のりもの",
    "image": "images/n_torakku.png",
    "file": "n_torakku.png",
    "prompt": "A realistic-leaning educational picture book illustration of sturdy delivery cargo truck (とらっく). Style: Gentle warm Japanese picture book style with delicate watercolor and colored pencil textures, subtle clear contours (cab in front, boxy cargo container in back, large wheels, mudflaps). Completely isolated on a solid pure white background (#ffffff) with no ground clutter, no background scenery, no props, no text, no watermarks, perfectly suited for a vocabulary flashcard for children. NOT a photograph, an illustration."
  },
  {
    "id": "n_patoka-",
    "name": "ぱとかー",
    "category": "norimono",
    "categoryName": "のりもの",
    "image": "images/n_patoka-.png",
    "file": "n_patoka-.png",
    "prompt": "A realistic-leaning educational picture book illustration of Japanese police patrol car (patrol car / patocar) (ぱとかー). Style: Gentle warm Japanese picture book style with delicate watercolor and colored pencil textures, subtle clear contours (black and lower-white body, bright red revolving warning light bar on roof, Japanese police crest). Completely isolated on a solid pure white background (#ffffff) with no ground clutter, no background scenery, no props, no text, no watermarks, perfectly suited for a vocabulary flashcard for children. NOT a photograph, an illustration."
  },
  {
    "id": "n_kyuukyuusha",
    "name": "きゅうきゅうしゃ",
    "category": "norimono",
    "categoryName": "のりもの",
    "image": "images/n_kyuukyuusha.png",
    "file": "n_kyuukyuusha.png",
    "prompt": "A realistic-leaning educational picture book illustration of Japanese ambulance vehicle (kyuukyuusha) (きゅうきゅうしゃ). Style: Gentle warm Japanese picture book style with delicate watercolor and colored pencil textures, subtle clear contours (clean white body with red horizontal stripe, flashing red beacon lights, red cross or Star of Life symbol). Completely isolated on a solid pure white background (#ffffff) with no ground clutter, no background scenery, no props, no text, no watermarks, perfectly suited for a vocabulary flashcard for children. NOT a photograph, an illustration."
  },
  {
    "id": "n_shoubousha",
    "name": "しょうぼうしゃ",
    "category": "norimono",
    "categoryName": "のりもの",
    "image": "images/n_shoubousha.png",
    "file": "n_shoubousha.png",
    "prompt": "A realistic-leaning educational picture book illustration of bright red fire engine truck (shoubousha) (しょうぼうしゃ). Style: Gentle warm Japanese picture book style with delicate watercolor and colored pencil textures, subtle clear contours (vibrant red body, chrome ladder on roof, coiled water hoses, flashing lights and chrome siren). Completely isolated on a solid pure white background (#ffffff) with no ground clutter, no background scenery, no props, no text, no watermarks, perfectly suited for a vocabulary flashcard for children. NOT a photograph, an illustration."
  },
  {
    "id": "n_shoberuka-",
    "name": "しょべるかー",
    "category": "norimono",
    "categoryName": "のりもの",
    "image": "images/n_shoberuka-.png",
    "file": "n_shoberuka-.png",
    "prompt": "A realistic-leaning educational picture book illustration of a yellow hydraulic excavator / power shovel (しょべるかー). Style: Gentle warm Japanese picture book style with delicate watercolor and colored pencil textures, subtle clear contours (yellow driver cab, black rubber crawler tracks, articulated boom arm, metal scoop bucket). Completely isolated on a solid pure white background (#ffffff) with no clutter, suitable for children vocabulary flashcard. NOT a photograph, an illustration."
  },
  {
    "id": "n_danpuka-",
    "name": "だんぷかー",
    "category": "norimono",
    "categoryName": "のりもの",
    "image": "images/n_danpuka-.png",
    "file": "n_danpuka-.png",
    "prompt": "A realistic-leaning educational picture book illustration of a sturdy dump truck with heavy wheels (だんぷかー). Style: Gentle warm Japanese picture book style with delicate watercolor and colored pencil textures, subtle clear contours (bright yellow/blue dump bed, large black tires, hydraulic lift mechanism). Completely isolated on a solid pure white background (#ffffff) with no clutter, suitable for children vocabulary flashcard. NOT a photograph, an illustration."
  },
  {
    "id": "n_densha",
    "name": "でんしゃ",
    "category": "norimono",
    "categoryName": "のりもの",
    "image": "images/n_densha.png",
    "file": "n_densha.png",
    "prompt": "A realistic-leaning educational picture book illustration of classic commuter train car (densha) (でんしゃ). Style: Gentle warm Japanese picture book style with delicate watercolor and colored pencil textures, subtle clear contours (silver metal body with colorful stripe, passenger doors and large windows). Completely isolated on a solid pure white background (#ffffff) with no ground clutter, no background scenery, no props, no text, no watermarks, perfectly suited for a vocabulary flashcard for children. NOT a photograph, an illustration."
  },
  {
    "id": "n_shinkansen",
    "name": "しんかんせん",
    "category": "norimono",
    "categoryName": "のりもの",
    "image": "images/n_shinkansen.png",
    "file": "n_shinkansen.png",
    "prompt": "A realistic-leaning educational picture book illustration of Japanese Shinkansen bullet train (E5 or N700 style) (しんかんせん). Style: Gentle warm Japanese picture book style with delicate watercolor and colored pencil textures, subtle clear contours (aerodynamic nose, sleek white and teal body, speed lines, driver windshield). Completely isolated on a solid pure white background (#ffffff) with no ground clutter, no background scenery, no props, no text, no watermarks, perfectly suited for a vocabulary flashcard for children. NOT a photograph, an illustration."
  },
  {
    "id": "n_kikansha",
    "name": "きかんしゃ",
    "category": "norimono",
    "categoryName": "のりもの",
    "image": "images/n_kikansha.png",
    "file": "n_kikansha.png",
    "prompt": "A realistic-leaning educational picture book illustration of a classic black steam locomotive train (きかんしゃ). Style: Gentle warm Japanese picture book style with delicate watercolor and colored pencil textures, subtle clear contours (black boiler, smokestack puffing gentle white steam, front headlight, large red drive wheels with connecting rods). Completely isolated on a solid pure white background (#ffffff) with no clutter, suitable for children vocabulary flashcard. NOT a photograph, an illustration."
  },
  {
    "id": "n_hikouki",
    "name": "ひこうき",
    "category": "norimono",
    "categoryName": "のりもの",
    "image": "images/n_hikouki.png",
    "file": "n_hikouki.png",
    "prompt": "A realistic-leaning educational picture book illustration of passenger jet airplane flying smoothly (ひこうき). Style: Gentle warm Japanese picture book style with delicate watercolor and colored pencil textures, subtle clear contours (white fuselage, swept-back wings, jet engines underneath, tail fin, passenger windows). Completely isolated on a solid pure white background (#ffffff) with no ground clutter, no background scenery, no props, no text, no watermarks, perfectly suited for a vocabulary flashcard for children. NOT a photograph, an illustration."
  },
  {
    "id": "n_herikoputa-",
    "name": "へりこぷたー",
    "category": "norimono",
    "categoryName": "のりもの",
    "image": "images/n_herikoputa-.png",
    "file": "n_herikoputa-.png",
    "prompt": "A realistic-leaning educational picture book illustration of rescue or passenger helicopter (へりこぷたー). Style: Gentle warm Japanese picture book style with delicate watercolor and colored pencil textures, subtle clear contours (spinning main rotor blades, tail rotor, cockpit bubble windows, landing skids). Completely isolated on a solid pure white background (#ffffff) with no ground clutter, no background scenery, no props, no text, no watermarks, perfectly suited for a vocabulary flashcard for children. NOT a photograph, an illustration."
  },
  {
    "id": "n_fune",
    "name": "ふね",
    "category": "norimono",
    "categoryName": "のりもの",
    "image": "images/n_fune.png",
    "file": "n_fune.png",
    "prompt": "A realistic-leaning educational picture book illustration of cruising ship / ferry boat on gentle water (ふね). Style: Gentle warm Japanese picture book style with delicate watercolor and colored pencil textures, subtle clear contours (clean white hull, passenger deck, smoke stack, observation windows). Completely isolated on a solid pure white background (#ffffff) with no ground clutter, no background scenery, no props, no text, no watermarks, perfectly suited for a vocabulary flashcard for children. NOT a photograph, an illustration."
  },
  {
    "id": "n_roketto",
    "name": "ろけっと",
    "category": "norimono",
    "categoryName": "のりもの",
    "image": "images/n_roketto.png",
    "file": "n_roketto.png",
    "prompt": "A realistic-leaning educational picture book illustration of sleek space rocket blasting off (ろけっと). Style: Gentle warm Japanese picture book style with delicate watercolor and colored pencil textures, subtle clear contours (white cylindrical body, red nose cone, triangular stabilizer fins, gentle fire exhaust plumes). Completely isolated on a solid pure white background (#ffffff) with no ground clutter, no background scenery, no props, no text, no watermarks, perfectly suited for a vocabulary flashcard for children. NOT a photograph, an illustration."
  },
  {
    "id": "n_keijidousha",
    "name": "けいじどうしゃ",
    "category": "norimono",
    "categoryName": "のりもの",
    "image": "images/n_keijidousha.png",
    "file": "n_keijidousha.png",
    "prompt": "A realistic-leaning educational picture book illustration of a compact yellow Japanese kei-car mini hatchback with friendly headlights, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "n_supo-tsuka-",
    "name": "すぽーつかー",
    "category": "norimono",
    "categoryName": "のりもの",
    "image": "images/n_supo-tsuka-.png",
    "file": "n_supo-tsuka-.png",
    "prompt": "A realistic-leaning educational picture book illustration of a sleek aerodynamic blue sports car with sporty alloy wheels, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "n_kyanpinguka-",
    "name": "きゃんぴんぐかー",
    "category": "norimono",
    "categoryName": "のりもの",
    "image": "images/n_kyanpinguka-.png",
    "file": "n_kyanpinguka-.png",
    "prompt": "A realistic-leaning educational picture book illustration of a comfortable recreational camper van RV with side awning and windows, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "n_yuubinsha",
    "name": "ゆうびんしゃ",
    "category": "norimono",
    "categoryName": "のりもの",
    "image": "images/n_yuubinsha.png",
    "file": "n_yuubinsha.png",
    "prompt": "A realistic-leaning educational picture book illustration of an authentic bright red Japanese post office mail delivery van (郵便車), clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "n_gomishuushuusha",
    "name": "ごみしゅうしゅうしゃ",
    "category": "norimono",
    "categoryName": "のりもの",
    "image": "images/n_gomishuushuusha.png",
    "file": "n_gomishuushuusha.png",
    "prompt": "A realistic-leaning educational picture book illustration of a blue Japanese municipal garbage collection packer truck with rear hopper, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "n_ro-doro-ra-",
    "name": "ろーどろーらー",
    "category": "norimono",
    "categoryName": "のりもの",
    "image": "images/n_ro-doro-ra-.png",
    "file": "n_ro-doro-ra-.png",
    "prompt": "A realistic-leaning educational picture book illustration of a heavy road roller machine with massive heavy steel vibrating drum roller in front, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "n_burudo-za-",
    "name": "ぶるどーざー",
    "category": "norimono",
    "categoryName": "のりもの",
    "image": "images/n_burudo-za-.png",
    "file": "n_burudo-za-.png",
    "prompt": "A realistic-leaning educational picture book illustration of a heavy yellow caterpillar bulldozer with wide steel pusher blade and crawler tracks, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "n_kure-nsha",
    "name": "くれーんしゃ",
    "category": "norimono",
    "categoryName": "のりもの",
    "image": "images/n_kure-nsha.png",
    "file": "n_kure-nsha.png",
    "prompt": "A realistic-leaning educational picture book illustration of a heavy mobile crane truck with telescoping lattice crane boom extended, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "n_konkuri-tomikisa-",
    "name": "みきさーしゃ",
    "category": "norimono",
    "categoryName": "のりもの",
    "image": "images/n_konkuri-tomikisa-.png",
    "file": "n_konkuri-tomikisa-.png",
    "prompt": "A realistic-leaning educational picture book illustration of a cement mixer truck with rotating angled drum barrel on chassis, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "n_fo-kurifuto",
    "name": "ふぉーくりふと",
    "category": "norimono",
    "categoryName": "のりもの",
    "image": "images/n_fo-kurifuto.png",
    "file": "n_fo-kurifuto.png",
    "prompt": "A realistic-leaning educational picture book illustration of a yellow industrial forklift vehicle with front lifting forks and overhead safety cage, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "n_torakuta-",
    "name": "とらくたー",
    "category": "norimono",
    "categoryName": "のりもの",
    "image": "images/n_torakuta-.png",
    "file": "n_torakuta-.png",
    "prompt": "A realistic-leaning educational picture book illustration of a sturdy green farm tractor with huge deeply-treaded rear wheels and front grille, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "n_hashigosha",
    "name": "はしごしゃ",
    "category": "norimono",
    "categoryName": "のりもの",
    "image": "images/n_hashigosha.png",
    "file": "n_hashigosha.png",
    "prompt": "A realistic-leaning educational picture book illustration of a red fire truck with long multi-stage turntable rescue ladder extended upward, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "n_dokuta-heri",
    "name": "どくたーへり",
    "category": "norimono",
    "categoryName": "のりもの",
    "image": "images/n_dokuta-heri.png",
    "file": "n_dokuta-heri.png",
    "prompt": "A realistic-leaning educational picture book illustration of a doctor emergency medical air ambulance helicopter with red cross livery, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "n_shirobai",
    "name": "しろばい",
    "category": "norimono",
    "categoryName": "のりもの",
    "image": "images/n_shirobai.png",
    "file": "n_shirobai.png",
    "prompt": "A realistic-leaning educational picture book illustration of an authentic Japanese white police motorcycle (白バイ) with windshield, siren, and blue lights, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "n_chikatetsu",
    "name": "ちかてつ",
    "category": "norimono",
    "categoryName": "のりもの",
    "image": "images/n_chikatetsu.png",
    "file": "n_chikatetsu.png",
    "prompt": "A realistic-leaning educational picture book illustration of a modern clean Japanese subway train entering a bright underground station, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "n_dokuta-iero-",
    "name": "どくたーいえろー",
    "category": "norimono",
    "categoryName": "のりもの",
    "image": "images/n_dokuta-iero-.png",
    "file": "n_dokuta-iero-.png",
    "prompt": "A realistic-leaning educational picture book illustration of the famous Japanese Doctor Yellow high-speed bullet train track inspection test car, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "n_kamotsuressha",
    "name": "かもつれっしゃ",
    "category": "norimono",
    "categoryName": "のりもの",
    "image": "images/n_kamotsuressha.png",
    "file": "n_kamotsuressha.png",
    "prompt": "A realistic-leaning educational picture book illustration of a powerful electric freight locomotive hauling a long line of colorful shipping containers, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "n_monore-ru",
    "name": "ものれーる",
    "category": "norimono",
    "categoryName": "のりもの",
    "image": "images/n_monore-ru.png",
    "file": "n_monore-ru.png",
    "prompt": "A realistic-leaning educational picture book illustration of a modern straddle-beam monorail train gliding along an elevated concrete track, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "n_romendensha",
    "name": "ろめんでんしゃ",
    "category": "norimono",
    "categoryName": "のりもの",
    "image": "images/n_romendensha.png",
    "file": "n_romendensha.png",
    "prompt": "A realistic-leaning educational picture book illustration of a charming single-car city streetcar / tram running on road tracks, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "n_ke-buruka-",
    "name": "けーぶるかー",
    "category": "norimono",
    "categoryName": "のりもの",
    "image": "images/n_ke-buruka-.png",
    "file": "n_ke-buruka-.png",
    "prompt": "A realistic-leaning educational picture book illustration of a steep incline cable car running on mountain rails pulled by cable, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "n_ro-puwei",
    "name": "ろーぷうぇい",
    "category": "norimono",
    "categoryName": "のりもの",
    "image": "images/n_ro-puwei.png",
    "file": "n_ro-puwei.png",
    "prompt": "A realistic-leaning educational picture book illustration of an aerial passenger ropeway gondola cabin suspended from mountain cables, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "n_sanrinsha",
    "name": "さんりんしゃ",
    "category": "norimono",
    "categoryName": "のりもの",
    "image": "images/n_sanrinsha.png",
    "file": "n_sanrinsha.png",
    "prompt": "A realistic-leaning educational picture book illustration of a colorful children tricycle with pedals on front wheel and handlebars, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "n_sutoraida-",
    "name": "すとらいだー",
    "category": "norimono",
    "categoryName": "のりもの",
    "image": "images/n_sutoraida-.png",
    "file": "n_sutoraida-.png",
    "prompt": "A realistic-leaning educational picture book illustration of a toddler balance bike (pedal-less runner bike) with pneumatic rubber tires, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "n_kikkusuke-ta-",
    "name": "きっくすけーたー",
    "category": "norimono",
    "categoryName": "のりもの",
    "image": "images/n_kikkusuke-ta-.png",
    "file": "n_kikkusuke-ta-.png",
    "prompt": "A realistic-leaning educational picture book illustration of a sleek children kick scooter with two wheels, standing footdeck, and T-handlebar, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "n_kurumaisu",
    "name": "くるまいす",
    "category": "norimono",
    "categoryName": "のりもの",
    "image": "images/n_kurumaisu.png",
    "file": "n_kurumaisu.png",
    "prompt": "A realistic-leaning educational picture book illustration of a comfortable modern lightweight manual wheelchair with large push-rim hand wheels, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "n_bebi-ka-",
    "name": "べびーかー",
    "category": "norimono",
    "categoryName": "のりもの",
    "image": "images/n_bebi-ka-.png",
    "file": "n_bebi-ka-.png",
    "prompt": "A realistic-leaning educational picture book illustration of a modern lightweight foldable baby stroller buggy with sun canopy, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "n_yotto",
    "name": "よっと",
    "category": "norimono",
    "categoryName": "のりもの",
    "image": "images/n_yotto.png",
    "file": "n_yotto.png",
    "prompt": "A realistic-leaning educational picture book illustration of a graceful sailing yacht with tall white triangular sails billowed in wind, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "n_kanu-",
    "name": "かぬー",
    "category": "norimono",
    "categoryName": "のりもの",
    "image": "images/n_kanu-.png",
    "file": "n_kanu-.png",
    "prompt": "A realistic-leaning educational picture book illustration of an open wooden Canadian canoe with a wooden paddle resting inside, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "n_bo-to",
    "name": "ぼーと",
    "category": "norimono",
    "categoryName": "のりもの",
    "image": "images/n_bo-to.png",
    "file": "n_bo-to.png",
    "prompt": "A realistic-leaning educational picture book illustration of a classic wooden rowboat with a pair of wooden oars in oarlocks, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "n_ka-feri-",
    "name": "かーふぇりー",
    "category": "norimono",
    "categoryName": "のりもの",
    "image": "images/n_ka-feri-.png",
    "file": "n_ka-feri-.png",
    "prompt": "A realistic-leaning educational picture book illustration of a large drive-on car ferry vessel with open bow loading ramp and passenger decks, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "n_oogatakyakusen",
    "name": "きゃくせん",
    "category": "norimono",
    "categoryName": "のりもの",
    "image": "images/n_oogatakyakusen.png",
    "file": "n_oogatakyakusen.png",
    "prompt": "A realistic-leaning educational picture book illustration of a magnificent giant luxury ocean cruise ship liner with multiple passenger cabin decks, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "n_gyosen",
    "name": "ぎょせん",
    "category": "norimono",
    "categoryName": "のりもの",
    "image": "images/n_gyosen.png",
    "file": "n_gyosen.png",
    "prompt": "A realistic-leaning educational picture book illustration of a Japanese coastal fishing boat equipped with squid fishing lights and trawling booms, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "n_sensuikan",
    "name": "せんすいかん",
    "category": "norimono",
    "categoryName": "のりもの",
    "image": "images/n_sensuikan.png",
    "file": "n_sensuikan.png",
    "prompt": "A realistic-leaning educational picture book illustration of a black submarine surfaced on ocean with conning tower and diving planes, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "n_kikyuu",
    "name": "ききゅう",
    "category": "norimono",
    "categoryName": "のりもの",
    "image": "images/n_kikyuu.png",
    "file": "n_kikyuu.png",
    "prompt": "A realistic-leaning educational picture book illustration of a colorful rainbow-striped hot air balloon floating gracefully in sky with wicker basket, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "n_hikousen",
    "name": "ひこうせん",
    "category": "norimono",
    "categoryName": "のりもの",
    "image": "images/n_hikousen.png",
    "file": "n_hikousen.png",
    "prompt": "A realistic-leaning educational picture book illustration of a huge streamlined white blimp airship with gondola underneath, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "m_enpitsu",
    "name": "えんぴつ",
    "category": "midikanamono",
    "categoryName": "みぢかなもの",
    "image": "images/m_enpitsu.png",
    "file": "m_enpitsu.png",
    "prompt": "A realistic-leaning educational picture book illustration of classic wooden HB pencil (えんぴつ). Style: Gentle warm Japanese picture book style with delicate watercolor and colored pencil textures, subtle clear contours (yellow or natural wood hexagonal shaft, sharpened tip showing grey graphite lead, pink eraser on end). Completely isolated on a solid pure white background (#ffffff) with no ground clutter, no background scenery, no props, no text, no watermarks, perfectly suited for a vocabulary flashcard for children. NOT a photograph, an illustration."
  },
  {
    "id": "m_keshigomu",
    "name": "けしごむ",
    "category": "midikanamono",
    "categoryName": "みぢかなもの",
    "image": "images/m_keshigomu.png",
    "file": "m_keshigomu.png",
    "prompt": "A realistic-leaning educational picture book illustration of a classic rectangular white eraser in blue sleeve (けしごむ). Style: Gentle warm Japanese picture book style with delicate watercolor and colored pencil textures, subtle clear contours (white plastic rubber tip, blue, white, and black cardboard sleeve). Completely isolated on a solid pure white background (#ffffff) with no clutter, suitable for children vocabulary flashcard. NOT a photograph, an illustration."
  },
  {
    "id": "m_hasami",
    "name": "はさみ",
    "category": "midikanamono",
    "categoryName": "みぢかなもの",
    "image": "images/m_hasami.png",
    "file": "m_hasami.png",
    "prompt": "A realistic-leaning educational picture book illustration of pair of children safety scissors (はさみ). Style: Gentle warm Japanese picture book style with delicate watercolor and colored pencil textures, subtle clear contours (blue or red plastic handles, blunt stainless steel blades open slightly). Completely isolated on a solid pure white background (#ffffff) with no ground clutter, no background scenery, no props, no text, no watermarks, perfectly suited for a vocabulary flashcard for children. NOT a photograph, an illustration."
  },
  {
    "id": "m_hon",
    "name": "ほん",
    "category": "midikanamono",
    "categoryName": "みぢかなもの",
    "image": "images/m_hon.png",
    "file": "m_hon.png",
    "prompt": "A realistic-leaning educational picture book illustration of open picture book with colorful pages (ほん). Style: Gentle warm Japanese picture book style with delicate watercolor and colored pencil textures, subtle clear contours (clean open binding, gentle blank illustrated storybook pages, colorful cover spine). Completely isolated on a solid pure white background (#ffffff) with no ground clutter, no background scenery, no props, no text, no watermarks, perfectly suited for a vocabulary flashcard for children. NOT a photograph, an illustration."
  },
  {
    "id": "m_tsukue",
    "name": "つくえ",
    "category": "midikanamono",
    "categoryName": "みぢかなもの",
    "image": "images/m_tsukue.png",
    "file": "m_tsukue.png",
    "prompt": "A realistic-leaning educational picture book illustration of a wooden elementary school study desk (つくえ). Style: Gentle warm Japanese picture book style with delicate watercolor and colored pencil textures, subtle clear contours (smooth wooden desktop, pull-out drawer, four sturdy legs). Completely isolated on a solid pure white background (#ffffff) with no clutter, suitable for children vocabulary flashcard. NOT a photograph, an illustration."
  },
  {
    "id": "m_isu",
    "name": "いす",
    "category": "midikanamono",
    "categoryName": "みぢかなもの",
    "image": "images/m_isu.png",
    "file": "m_isu.png",
    "prompt": "A realistic-leaning educational picture book illustration of sturdy wooden children chair (いす). Style: Gentle warm Japanese picture book style with delicate watercolor and colored pencil textures, subtle clear contours (four round wooden legs, smooth wooden seat, supportive backrest). Completely isolated on a solid pure white background (#ffffff) with no ground clutter, no background scenery, no props, no text, no watermarks, perfectly suited for a vocabulary flashcard for children. NOT a photograph, an illustration."
  },
  {
    "id": "m_kaban",
    "name": "かばん",
    "category": "midikanamono",
    "categoryName": "みぢかなもの",
    "image": "images/m_kaban.png",
    "file": "m_kaban.png",
    "prompt": "A realistic-leaning educational picture book illustration of traditional Japanese school backpack (randoseru) (かばん). Style: Gentle warm Japanese picture book style with delicate watercolor and colored pencil textures, subtle clear contours (glossy red or black leather, large flap cover, shoulder straps and metal buckle). Completely isolated on a solid pure white background (#ffffff) with no ground clutter, no background scenery, no props, no text, no watermarks, perfectly suited for a vocabulary flashcard for children. NOT a photograph, an illustration."
  },
  {
    "id": "m_boushi",
    "name": "ぼうし",
    "category": "midikanamono",
    "categoryName": "みぢかなもの",
    "image": "images/m_boushi.png",
    "file": "m_boushi.png",
    "prompt": "A realistic-leaning educational picture book illustration of blue or red baseball cap with visor (ぼうし). Style: Gentle warm Japanese picture book style with delicate watercolor and colored pencil textures, subtle clear contours (curved brim visor, rounded crown with button on top, eyelet stitching). Completely isolated on a solid pure white background (#ffffff) with no ground clutter, no background scenery, no props, no text, no watermarks, perfectly suited for a vocabulary flashcard for children. NOT a photograph, an illustration."
  },
  {
    "id": "m_ti-shatsu",
    "name": "てぃーしゃつ",
    "category": "midikanamono",
    "categoryName": "みぢかなもの",
    "image": "images/m_ti-shatsu.png",
    "file": "m_ti-shatsu.png",
    "prompt": "A realistic-leaning educational picture book illustration of a short-sleeved cotton T-shirt (てぃーしゃつ). Style: Gentle warm Japanese picture book style with delicate watercolor and colored pencil textures, subtle clear contours (clean blue or green fabric, crew neck collar, chest pocket). Completely isolated on a solid pure white background (#ffffff) with no clutter, suitable for children vocabulary flashcard. NOT a photograph, an illustration."
  },
  {
    "id": "m_kutsushita",
    "name": "くつした",
    "category": "midikanamono",
    "categoryName": "みぢかなもの",
    "image": "images/m_kutsushita.png",
    "file": "m_kutsushita.png",
    "prompt": "A realistic-leaning educational picture book illustration of a simple neat pair of everyday children white crew socks (普段履きのシンプルな子どもの白い靴下), clean white with a subtle light blue cuff band, plain and simple everyday socks, NOT flashy, not overly striped. Clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff)."
  },
  {
    "id": "m_kutsu",
    "name": "くつ",
    "category": "midikanamono",
    "categoryName": "みぢかなもの",
    "image": "images/m_kutsu.png",
    "file": "m_kutsu.png",
    "prompt": "A realistic-leaning educational picture book illustration of pair of colorful children sneakers / shoes (くつ). Style: Gentle warm Japanese picture book style with delicate watercolor and colored pencil textures, subtle clear contours (bright blue or red canvas, white rubber soles and toe caps, easy velcro strap). Completely isolated on a solid pure white background (#ffffff) with no ground clutter, no background scenery, no props, no text, no watermarks, perfectly suited for a vocabulary flashcard for children. NOT a photograph, an illustration."
  },
  {
    "id": "m_kasa",
    "name": "かさ",
    "category": "midikanamono",
    "categoryName": "みぢかなもの",
    "image": "images/m_kasa.png",
    "file": "m_kasa.png",
    "prompt": "A realistic-leaning educational picture book illustration of bright yellow opened umbrella (かさ). Style: Gentle warm Japanese picture book style with delicate watercolor and colored pencil textures, subtle clear contours (smooth dome-shaped canopy, curved J-handle, ferrule tip on top). Completely isolated on a solid pure white background (#ffffff) with no ground clutter, no background scenery, no props, no text, no watermarks, perfectly suited for a vocabulary flashcard for children. NOT a photograph, an illustration."
  },
  {
    "id": "m_taoru",
    "name": "たおる",
    "category": "midikanamono",
    "categoryName": "みぢかなもの",
    "image": "images/m_taoru.png",
    "file": "m_taoru.png",
    "prompt": "A realistic-leaning educational picture book illustration of neatly folded soft fluffy pastel bath towels (たおる). Style: Gentle warm Japanese picture book style with delicate watercolor and colored pencil textures, subtle clear contours (fluffy terrycloth loop texture, neat folded edges). Completely isolated on a solid pure white background (#ffffff) with no clutter, suitable for children vocabulary flashcard. NOT a photograph, an illustration."
  },
  {
    "id": "m_haburashi",
    "name": "はぶらし",
    "category": "midikanamono",
    "categoryName": "みぢかなもの",
    "image": "images/m_haburashi.png",
    "file": "m_haburashi.png",
    "prompt": "A realistic-leaning educational picture book illustration of colorful children toothbrush (はぶらし). Style: Gentle warm Japanese picture book style with delicate watercolor and colored pencil textures, subtle clear contours (ergonomic colored handle, neat white bristles, gentle curve). Completely isolated on a solid pure white background (#ffffff) with no ground clutter, no background scenery, no props, no text, no watermarks, perfectly suited for a vocabulary flashcard for children. NOT a photograph, an illustration."
  },
  {
    "id": "m_koppu",
    "name": "こっぷ",
    "category": "midikanamono",
    "categoryName": "みぢかなもの",
    "image": "images/m_koppu.png",
    "file": "m_koppu.png",
    "prompt": "A realistic-leaning educational picture book illustration of transparent or light blue drinking cup / glass (こっぷ). Style: Gentle warm Japanese picture book style with delicate watercolor and colored pencil textures, subtle clear contours (smooth cylindrical tumbler filled with clear sparkling water). Completely isolated on a solid pure white background (#ffffff) with no ground clutter, no background scenery, no props, no text, no watermarks, perfectly suited for a vocabulary flashcard for children. NOT a photograph, an illustration."
  },
  {
    "id": "m_terebi",
    "name": "てれび",
    "category": "midikanamono",
    "categoryName": "みぢかなもの",
    "image": "images/m_terebi.png",
    "file": "m_terebi.png",
    "prompt": "A realistic-leaning educational picture book illustration of modern flat-screen television monitor (てれび). Style: Gentle warm Japanese picture book style with delicate watercolor and colored pencil textures, subtle clear contours (slim dark bezel, sleek stand base, widescreen display showing a gentle colorful screen). Completely isolated on a solid pure white background (#ffffff) with no ground clutter, no background scenery, no props, no text, no watermarks, perfectly suited for a vocabulary flashcard for children. NOT a photograph, an illustration."
  },
  {
    "id": "m_denwa",
    "name": "でんわ",
    "category": "midikanamono",
    "categoryName": "みぢかなもの",
    "image": "images/m_denwa.png",
    "file": "m_denwa.png",
    "prompt": "A realistic-leaning educational picture book illustration of a modern push-button desk telephone (現代のプッシュホン式固定電話), clean white body with a handset resting on cradle, a full neat grid of push buttons with number keys arranged in rows, small digital display screen, coiled cord, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff)."
  },
  {
    "id": "m_bo-ru",
    "name": "ぼーる",
    "category": "midikanamono",
    "categoryName": "みぢかなもの",
    "image": "images/m_bo-ru.png",
    "file": "m_bo-ru.png",
    "prompt": "A realistic-leaning educational picture book illustration of classic soccer ball / colorful play ball (ぼーる). Style: Gentle warm Japanese picture book style with delicate watercolor and colored pencil textures, subtle clear contours (iconic black and white pentagon patchwork pattern, round 3D volume). Completely isolated on a solid pure white background (#ffffff) with no ground clutter, no background scenery, no props, no text, no watermarks, perfectly suited for a vocabulary flashcard for children. NOT a photograph, an illustration."
  },
  {
    "id": "m_fuusen",
    "name": "ふうせん",
    "category": "midikanamono",
    "categoryName": "みぢかなもの",
    "image": "images/m_fuusen.png",
    "file": "m_fuusen.png",
    "prompt": "A realistic-leaning educational picture book illustration of cluster of three colorful helium balloons (ふうせん). Style: Gentle warm Japanese picture book style with delicate watercolor and colored pencil textures, subtle clear contours (red, yellow, and blue shiny balloons floating on strings tied together). Completely isolated on a solid pure white background (#ffffff) with no ground clutter, no background scenery, no props, no text, no watermarks, perfectly suited for a vocabulary flashcard for children. NOT a photograph, an illustration."
  },
  {
    "id": "m_no-to",
    "name": "のーと",
    "category": "midikanamono",
    "categoryName": "みぢかなもの",
    "image": "images/m_no-to.png",
    "file": "m_no-to.png",
    "prompt": "A realistic-leaning educational picture book illustration of a classic Japanese school notebook with ruled blue lines and clean cover, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "m_origami",
    "name": "おりがみ",
    "category": "midikanamono",
    "categoryName": "みぢかなもの",
    "image": "images/m_origami.png",
    "file": "m_origami.png",
    "prompt": "A realistic-leaning educational picture book illustration of a neat stack of vibrant colorful square origami papers in various rainbow shades, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "m_kureyon",
    "name": "くれよん",
    "category": "midikanamono",
    "categoryName": "みぢかなもの",
    "image": "images/m_kureyon.png",
    "file": "m_kureyon.png",
    "prompt": "A realistic-leaning educational picture book illustration of a box of colorful wax crayons lined up neatly with paper wrappers, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "m_iroenpitsu",
    "name": "いろえんぴつ",
    "category": "midikanamono",
    "categoryName": "みぢかなもの",
    "image": "images/m_iroenpitsu.png",
    "file": "m_iroenpitsu.png",
    "prompt": "A realistic-leaning educational picture book illustration of a round tin case of sharpened colored pencils arranged in rainbow spectrum, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "m_enogu",
    "name": "えのぐ",
    "category": "midikanamono",
    "categoryName": "みぢかなもの",
    "image": "images/m_enogu.png",
    "file": "m_enogu.png",
    "prompt": "A realistic-leaning educational picture book illustration of a set of colorful watercolor paint tubes and a plastic mixing palette with dabs of paint, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "m_fudebako",
    "name": "ふでばこ",
    "category": "midikanamono",
    "categoryName": "みぢかなもの",
    "image": "images/m_fudebako.png",
    "file": "m_fudebako.png",
    "prompt": "A realistic-leaning educational picture book illustration of a sturdy children pencil case open showing neat pencil holders, eraser, and ruler, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "m_monosashi",
    "name": "ものさし",
    "category": "midikanamono",
    "categoryName": "みぢかなもの",
    "image": "images/m_monosashi.png",
    "file": "m_monosashi.png",
    "prompt": "A realistic-leaning educational picture book illustration of a transparent 30-centimeter plastic school ruler with clear millimeter markings, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "m_nori",
    "name": "のり",
    "category": "midikanamono",
    "categoryName": "みぢかなもの",
    "image": "images/m_nori.png",
    "file": "m_nori.png",
    "prompt": "A realistic-leaning educational picture book illustration of a twist-up solid glue stick with blue cap and white glue core, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "m_serote-pu",
    "name": "せろてーぷ",
    "category": "midikanamono",
    "categoryName": "みぢかなもの",
    "image": "images/m_serote-pu.png",
    "file": "m_serote-pu.png",
    "prompt": "A realistic-leaning educational picture book illustration of a heavy desktop clear tape dispenser with serrated cutting blade and tape roll, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "m_hocchikisu",
    "name": "ほっちきす",
    "category": "midikanamono",
    "categoryName": "みぢかなもの",
    "image": "images/m_hocchikisu.png",
    "file": "m_hocchikisu.png",
    "prompt": "A realistic-leaning educational picture book illustration of a handheld blue paper stapler with a row of shiny metal staples, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "m_mushimegane",
    "name": "むしめがね",
    "category": "midikanamono",
    "categoryName": "みぢかなもの",
    "image": "images/m_mushimegane.png",
    "file": "m_mushimegane.png",
    "prompt": "A realistic-leaning educational picture book illustration of a classic round magnifying glass with brass frame and wooden handle, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "m_randoseru",
    "name": "らんどせる",
    "category": "midikanamono",
    "categoryName": "みぢかなもの",
    "image": "images/m_randoseru.png",
    "file": "m_randoseru.png",
    "prompt": "A realistic-leaning educational picture book illustration of an authentic Japanese children leather school bag (Randoseru) in classic glossy red and black, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "m_ryukku",
    "name": "りゅっく",
    "category": "midikanamono",
    "categoryName": "みぢかなもの",
    "image": "images/m_ryukku.png",
    "file": "m_ryukku.png",
    "prompt": "A realistic-leaning educational picture book illustration of a durable children backpack with padded shoulder straps, front zipper pocket, and side mesh bottles, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "m_suitou",
    "name": "すいとう",
    "category": "midikanamono",
    "categoryName": "みぢかなもの",
    "image": "images/m_suitou.png",
    "file": "m_suitou.png",
    "prompt": "A realistic-leaning educational picture book illustration of a stainless steel children water bottle thermos with carrying shoulder strap and push-button lid, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "m_obentoubako",
    "name": "おべんとうばこ",
    "category": "midikanamono",
    "categoryName": "みぢかなもの",
    "image": "images/m_obentoubako.png",
    "file": "m_obentoubako.png",
    "prompt": "A realistic-leaning educational picture book illustration of a neat bento lunch box closed with elastic band, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "m_hashiire",
    "name": "はしいれ",
    "category": "midikanamono",
    "categoryName": "みぢかなもの",
    "image": "images/m_hashiire.png",
    "file": "m_hashiire.png",
    "prompt": "A realistic-leaning educational picture book illustration of a sliding plastic chopsticks case holding a pair of reusable chopsticks, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "m_saifu",
    "name": "さいふ",
    "category": "midikanamono",
    "categoryName": "みぢかなもの",
    "image": "images/m_saifu.png",
    "file": "m_saifu.png",
    "prompt": "A realistic-leaning educational picture book illustration of a small folding leather wallet with coin snap pocket and bill fold, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "m_shatsu",
    "name": "しゃつ",
    "category": "midikanamono",
    "categoryName": "みぢかなもの",
    "image": "images/m_shatsu.png",
    "file": "m_shatsu.png",
    "prompt": "A realistic-leaning educational picture book illustration of a clean white cotton short-sleeve undershirt laid flat, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "m_pa-ka-",
    "name": "ぱーかー",
    "category": "midikanamono",
    "categoryName": "みぢかなもの",
    "image": "images/m_pa-ka-.png",
    "file": "m_pa-ka-.png",
    "prompt": "A realistic-leaning educational picture book illustration of a cozy heather-grey hooded sweatshirt hoodie with front kangaroo pocket, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "m_se-ta-",
    "name": "せーたー",
    "category": "midikanamono",
    "categoryName": "みぢかなもの",
    "image": "images/m_se-ta-.png",
    "file": "m_se-ta-.png",
    "prompt": "A realistic-leaning educational picture book illustration of a warm knitted wool sweater with ribbed cuffs and crew neckline, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "m_zubon",
    "name": "ずぼん",
    "category": "midikanamono",
    "categoryName": "みぢかなもの",
    "image": "images/m_zubon.png",
    "file": "m_zubon.png",
    "prompt": "A realistic-leaning educational picture book illustration of a pair of blue denim jeans trousers with pockets, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "m_hanzubon",
    "name": "はんずぼん",
    "category": "midikanamono",
    "categoryName": "みぢかなもの",
    "image": "images/m_hanzubon.png",
    "file": "m_hanzubon.png",
    "prompt": "A realistic-leaning educational picture book illustration of a pair of comfortable cotton khaki short pants / shorts for children, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "m_suka-to",
    "name": "すかーと",
    "category": "midikanamono",
    "categoryName": "みぢかなもの",
    "image": "images/m_suka-to.png",
    "file": "m_suka-to.png",
    "prompt": "A realistic-leaning educational picture book illustration of a pleated navy blue school skirt, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "m_wanpi-su",
    "name": "わんぴーす",
    "category": "midikanamono",
    "categoryName": "みぢかなもの",
    "image": "images/m_wanpi-su.png",
    "file": "m_wanpi-su.png",
    "prompt": "A realistic-leaning educational picture book illustration of a charming girl floral summer one-piece dress with short sleeves, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "m_pajama",
    "name": "ぱじゃま",
    "category": "midikanamono",
    "categoryName": "みぢかなもの",
    "image": "images/m_pajama.png",
    "file": "m_pajama.png",
    "prompt": "A realistic-leaning educational picture book illustration of a set of long-sleeve comfortable button-up cotton sleepwear pajamas with matching trousers, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "m_shitagi",
    "name": "したぎ",
    "category": "midikanamono",
    "categoryName": "みぢかなもの",
    "image": "images/m_shitagi.png",
    "file": "m_shitagi.png",
    "prompt": "A realistic-leaning educational picture book illustration of a neat set of clean white children cotton undergarments, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "m_pantsu",
    "name": "ぱんつ",
    "category": "midikanamono",
    "categoryName": "みぢかなもの",
    "image": "images/m_pantsu.png",
    "file": "m_pantsu.png",
    "prompt": "A realistic-leaning educational picture book illustration of a pair of clean simple children cotton underwear underpants, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "m_mafura-",
    "name": "まふらー",
    "category": "midikanamono",
    "categoryName": "みぢかなもの",
    "image": "images/m_mafura-.png",
    "file": "m_mafura-.png",
    "prompt": "A realistic-leaning educational picture book illustration of a soft warm knitted winter scarf with fringed ends, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "m_tebukuro",
    "name": "てぶくろ",
    "category": "midikanamono",
    "categoryName": "みぢかなもの",
    "image": "images/m_tebukuro.png",
    "file": "m_tebukuro.png",
    "prompt": "A realistic-leaning educational picture book illustration of a pair of cozy warm wool mittens connected by a string, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "m_masuku",
    "name": "ますく",
    "category": "midikanamono",
    "categoryName": "みぢかなもの",
    "image": "images/m_masuku.png",
    "file": "m_masuku.png",
    "prompt": "A realistic-leaning educational picture book illustration of a clean white pleated protective face mask with elastic ear loops, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "m_megane",
    "name": "めがね",
    "category": "midikanamono",
    "categoryName": "みぢかなもの",
    "image": "images/m_megane.png",
    "file": "m_megane.png",
    "prompt": "A realistic-leaning educational picture book illustration of a pair of stylish round tortoiseshell reading eyeglasses, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "m_udedokei",
    "name": "うでどけい",
    "category": "midikanamono",
    "categoryName": "みぢかなもの",
    "image": "images/m_udedokei.png",
    "file": "m_udedokei.png",
    "prompt": "A realistic-leaning educational picture book illustration of a wristwatch with clear round dial, hour markers, and leather strap, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "m_uwabaki",
    "name": "うわばき",
    "category": "midikanamono",
    "categoryName": "みぢかなもの",
    "image": "images/m_uwabaki.png",
    "file": "m_uwabaki.png",
    "prompt": "A realistic-leaning educational picture book illustration of a pair of authentic Japanese white canvas school indoor shoes (uwabaki) with red rubber toe band, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "m_nagagutsu",
    "name": "ながぐつ",
    "category": "midikanamono",
    "categoryName": "みぢかなもの",
    "image": "images/m_nagagutsu.png",
    "file": "m_nagagutsu.png",
    "prompt": "A realistic-leaning educational picture book illustration of a pair of bright yellow rubber rain boots for splashing in puddles, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "m_suni-ka-",
    "name": "すにーかー",
    "category": "midikanamono",
    "categoryName": "みぢかなもの",
    "image": "images/m_suni-ka-.png",
    "file": "m_suni-ka-.png",
    "prompt": "A realistic-leaning educational picture book illustration of a pair of athletic running sneakers with laces and cushioned soles, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "m_sandaru",
    "name": "さんだる",
    "category": "midikanamono",
    "categoryName": "みぢかなもの",
    "image": "images/m_sandaru.png",
    "file": "m_sandaru.png",
    "prompt": "A realistic-leaning educational picture book illustration of a pair of comfortable summer strap sandals, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "m_kappa",
    "name": "かっぱ",
    "category": "midikanamono",
    "categoryName": "みぢかなもの",
    "image": "images/m_kappa.png",
    "file": "m_kappa.png",
    "prompt": "A realistic-leaning educational picture book illustration of a bright yellow hooded children raincoat with reflective safety stripes, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "m_hankachi",
    "name": "はんかち",
    "category": "midikanamono",
    "categoryName": "みぢかなもの",
    "image": "images/m_hankachi.png",
    "file": "m_hankachi.png",
    "prompt": "A realistic-leaning educational picture book illustration of a folded cotton pocket handkerchief with gentle plaid pattern, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "m_te-buru",
    "name": "てーぶる",
    "category": "midikanamono",
    "categoryName": "みぢかなもの",
    "image": "images/m_te-buru.png",
    "file": "m_te-buru.png",
    "prompt": "A realistic-leaning educational picture book illustration of a smooth wooden dining table with sturdy legs, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "m_sofa",
    "name": "そふぁ",
    "category": "midikanamono",
    "categoryName": "みぢかなもの",
    "image": "images/m_sofa.png",
    "file": "m_sofa.png",
    "prompt": "A realistic-leaning educational picture book illustration of a comfortable cushioned two-seater living room sofa, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "m_beddo",
    "name": "べっど",
    "category": "midikanamono",
    "categoryName": "みぢかなもの",
    "image": "images/m_beddo.png",
    "file": "m_beddo.png",
    "prompt": "A realistic-leaning educational picture book illustration of a neat wooden single bed frame with mattress, white sheet, and pillow, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "m_futon",
    "name": "ふとん",
    "category": "midikanamono",
    "categoryName": "みぢかなもの",
    "image": "images/m_futon.png",
    "file": "m_futon.png",
    "prompt": "A realistic-leaning educational picture book illustration of a traditional Japanese sleeping futon mattress laid flat on tatami, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "m_makura",
    "name": "まくら",
    "category": "midikanamono",
    "categoryName": "みぢかなもの",
    "image": "images/m_makura.png",
    "file": "m_makura.png",
    "prompt": "A realistic-leaning educational picture book illustration of a soft plump white sleeping pillow with clean cotton pillowcase, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "m_moufu",
    "name": "もうふ",
    "category": "midikanamono",
    "categoryName": "みぢかなもの",
    "image": "images/m_moufu.png",
    "file": "m_moufu.png",
    "prompt": "A realistic-leaning educational picture book illustration of a soft thick fleece blanket with whipped hem, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "m_ka-ten",
    "name": "かーてん",
    "category": "midikanamono",
    "categoryName": "みぢかなもの",
    "image": "images/m_ka-ten.png",
    "file": "m_ka-ten.png",
    "prompt": "A realistic-leaning educational picture book illustration of a pair of soft pastel window curtains tied back with fabric ties, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "m_gomibako",
    "name": "ごみばこ",
    "category": "midikanamono",
    "categoryName": "みぢかなもの",
    "image": "images/m_gomibako.png",
    "file": "m_gomibako.png",
    "prompt": "A realistic-leaning educational picture book illustration of a clean simple round indoor wastebasket trash can, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "m_chiri-tori",
    "name": "ちりとり",
    "category": "midikanamono",
    "categoryName": "みぢかなもの",
    "image": "images/m_chiri-tori.png",
    "file": "m_chiri-tori.png",
    "prompt": "A realistic-leaning educational picture book illustration of a plastic dustpan with angled edge and handle, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "m_houki",
    "name": "ほうき",
    "category": "midikanamono",
    "categoryName": "みぢかなもの",
    "image": "images/m_houki.png",
    "file": "m_houki.png",
    "prompt": "A realistic-leaning educational picture book illustration of a classic straw broom with long wooden handle, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "m_zoukin",
    "name": "ぞうきん",
    "category": "midikanamono",
    "categoryName": "みぢかなもの",
    "image": "images/m_zoukin.png",
    "file": "m_zoukin.png",
    "prompt": "A realistic-leaning educational picture book illustration of a white sewn cotton cleaning rag (zoukin) with cross stitching, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "m_soujiki",
    "name": "そうじき",
    "category": "midikanamono",
    "categoryName": "みぢかなもの",
    "image": "images/m_soujiki.png",
    "file": "m_soujiki.png",
    "prompt": "A realistic-leaning educational picture book illustration of a canister vacuum cleaner with flexible hose and floor nozzle head, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "m_osara",
    "name": "おさら",
    "category": "midikanamono",
    "categoryName": "みぢかなもの",
    "image": "images/m_osara.png",
    "file": "m_osara.png",
    "prompt": "A realistic-leaning educational picture book illustration of a clean white ceramic dinner plate with subtle rim, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "m_ochawan",
    "name": "おちゃわん",
    "category": "midikanamono",
    "categoryName": "みぢかなもの",
    "image": "images/m_ochawan.png",
    "file": "m_ochawan.png",
    "prompt": "A realistic-leaning educational picture book illustration of a traditional ceramic Japanese rice bowl with subtle blue glaze, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "m_shiruwan",
    "name": "しるわん",
    "category": "midikanamono",
    "categoryName": "みぢかなもの",
    "image": "images/m_shiruwan.png",
    "file": "m_shiruwan.png",
    "prompt": "A realistic-leaning educational picture book illustration of a dark red and black lacquer Japanese soup bowl for miso soup, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "m_supu-n",
    "name": "すぷーん",
    "category": "midikanamono",
    "categoryName": "みぢかなもの",
    "image": "images/m_supu-n.png",
    "file": "m_supu-n.png",
    "prompt": "A realistic-leaning educational picture book illustration of a polished stainless steel table spoon reflecting light, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "m_fo-ku",
    "name": "ふぉーく",
    "category": "midikanamono",
    "categoryName": "みぢかなもの",
    "image": "images/m_fo-ku.png",
    "file": "m_fo-ku.png",
    "prompt": "A realistic-leaning educational picture book illustration of a polished stainless steel dinner fork with four tines, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "m_ohashi",
    "name": "おはし",
    "category": "midikanamono",
    "categoryName": "みぢかなもの",
    "image": "images/m_ohashi.png",
    "file": "m_ohashi.png",
    "prompt": "A realistic-leaning educational picture book illustration of a pair of smooth wooden Japanese eating chopsticks resting on a ceramic chopstick rest, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "m_suto-ro-",
    "name": "すとろー",
    "category": "midikanamono",
    "categoryName": "みぢかなもの",
    "image": "images/m_suto-ro-.png",
    "file": "m_suto-ro-.png",
    "prompt": "A realistic-leaning educational picture book illustration of a colorful bent plastic drinking straw, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "m_nabe",
    "name": "なべ",
    "category": "midikanamono",
    "categoryName": "みぢかなもの",
    "image": "images/m_nabe.png",
    "file": "m_nabe.png",
    "prompt": "A realistic-leaning educational picture book illustration of a stainless steel two-handled cooking stockpot with lid, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "m_furaipan",
    "name": "ふらいぱん",
    "category": "midikanamono",
    "categoryName": "みぢかなもの",
    "image": "images/m_furaipan.png",
    "file": "m_furaipan.png",
    "prompt": "A realistic-leaning educational picture book illustration of a black non-stick frying pan with long handle, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "m_yakan",
    "name": "やかん",
    "category": "midikanamono",
    "categoryName": "みぢかなもの",
    "image": "images/m_yakan.png",
    "file": "m_yakan.png",
    "prompt": "A realistic-leaning educational picture book illustration of a shiny stainless steel stovetop water boiling kettle with black handle and whistle spout, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "m_houchou",
    "name": "ほうちょう",
    "category": "midikanamono",
    "categoryName": "みぢかなもの",
    "image": "images/m_houchou.png",
    "file": "m_houchou.png",
    "prompt": "A realistic-leaning educational picture book illustration of a sharp Japanese kitchen chef knife with wooden handle, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "m_manaita",
    "name": "まないた",
    "category": "midikanamono",
    "categoryName": "みぢかなもの",
    "image": "images/m_manaita.png",
    "file": "m_manaita.png",
    "prompt": "A realistic-leaning educational picture book illustration of a clean wooden kitchen cutting board, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "m_reizouko",
    "name": "れいぞうこ",
    "category": "midikanamono",
    "categoryName": "みぢかなもの",
    "image": "images/m_reizouko.png",
    "file": "m_reizouko.png",
    "prompt": "A realistic-leaning educational picture book illustration of a modern two-door stainless steel kitchen refrigerator, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "m_denshirenji",
    "name": "でんしれんじ",
    "category": "midikanamono",
    "categoryName": "みぢかなもの",
    "image": "images/m_denshirenji.png",
    "file": "m_denshirenji.png",
    "prompt": "A realistic-leaning educational picture book illustration of a countertop kitchen microwave oven with glass viewing door and digital timer display, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "m_suihanki",
    "name": "すいはんき",
    "category": "midikanamono",
    "categoryName": "みぢかなもの",
    "image": "images/m_suihanki.png",
    "file": "m_suihanki.png",
    "prompt": "A realistic-leaning educational picture book illustration of a modern Japanese electric induction heating rice cooker with digital control panel, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "m_to-suta-",
    "name": "とーすたー",
    "category": "midikanamono",
    "categoryName": "みぢかなもの",
    "image": "images/m_to-suta-.png",
    "file": "m_to-suta-.png",
    "prompt": "A realistic-leaning educational picture book illustration of a retro pop-up bread toaster with two browned bread slices popping out, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "m_senpuuki",
    "name": "せんぷうき",
    "category": "midikanamono",
    "categoryName": "みぢかなもの",
    "image": "images/m_senpuuki.png",
    "file": "m_senpuuki.png",
    "prompt": "A realistic-leaning educational picture book illustration of a classic five-bladed oscillating electric standing fan in cool blue and white, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "m_eakon",
    "name": "えあこん",
    "category": "midikanamono",
    "categoryName": "みぢかなもの",
    "image": "images/m_eakon.png",
    "file": "m_eakon.png",
    "prompt": "A realistic-leaning educational picture book illustration of a modern sleek white wall-mounted indoor air conditioner unit blowing gentle cool air, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "m_sentakuki",
    "name": "せんたくき",
    "category": "midikanamono",
    "categoryName": "みぢかなもの",
    "image": "images/m_sentakuki.png",
    "file": "m_sentakuki.png",
    "prompt": "A realistic-leaning educational picture book illustration of a modern front-loading drum washing machine with circular glass porthole door, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "m_kamera",
    "name": "かめら",
    "category": "midikanamono",
    "categoryName": "みぢかなもの",
    "image": "images/m_kamera.png",
    "file": "m_kamera.png",
    "prompt": "A realistic-leaning educational picture book illustration of a modern digital mirrorless camera with zoom lens, mode dial, and neck strap, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "m_taburetto",
    "name": "たぶれっと",
    "category": "midikanamono",
    "categoryName": "みぢかなもの",
    "image": "images/m_taburetto.png",
    "file": "m_taburetto.png",
    "prompt": "A realistic-leaning educational picture book illustration of a touchscreen slate digital tablet computer displaying bright application icons, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "m_pasokon",
    "name": "ぱそこん",
    "category": "midikanamono",
    "categoryName": "みぢかなもの",
    "image": "images/m_pasokon.png",
    "file": "m_pasokon.png",
    "prompt": "A realistic-leaning educational picture book illustration of an open modern laptop computer with glowing screen, keyboard, and trackpad, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "m_rimokon",
    "name": "りもこん",
    "category": "midikanamono",
    "categoryName": "みぢかなもの",
    "image": "images/m_rimokon.png",
    "file": "m_rimokon.png",
    "prompt": "A realistic-leaning educational picture book illustration of a television handheld infrared remote control wand with rubber numeric buttons, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "m_sekken",
    "name": "せっけん",
    "category": "midikanamono",
    "categoryName": "みぢかなもの",
    "image": "images/m_sekken.png",
    "file": "m_sekken.png",
    "prompt": "A realistic-leaning educational picture book illustration of a clean bar of pastel scented soap on a drainage soap dish with gentle lather bubbles, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "m_handoso-pu",
    "name": "はんどそーぷ",
    "category": "midikanamono",
    "categoryName": "みぢかなもの",
    "image": "images/m_handoso-pu.png",
    "file": "m_handoso-pu.png",
    "prompt": "A realistic-leaning educational picture book illustration of a pump bottle of foaming liquid hand soap with rich lather, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "m_shanpu-",
    "name": "しゃんぷー",
    "category": "midikanamono",
    "categoryName": "みぢかなもの",
    "image": "images/m_shanpu-.png",
    "file": "m_shanpu-.png",
    "prompt": "A realistic-leaning educational picture book illustration of a pump dispenser bottle of hair shampoo with clean bubbles, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "m_basutaoru",
    "name": "ばすたおる",
    "category": "midikanamono",
    "categoryName": "みぢかなもの",
    "image": "images/m_basutaoru.png",
    "file": "m_basutaoru.png",
    "prompt": "A realistic-leaning educational picture book illustration of a stack of fluffy folded oversized cotton bath towels, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "m_tsumekiri",
    "name": "つめきり",
    "category": "midikanamono",
    "categoryName": "みぢかなもの",
    "image": "images/m_tsumekiri.png",
    "file": "m_tsumekiri.png",
    "prompt": "A realistic-leaning educational picture book illustration of a stainless steel lever nail clippers with nail file edge, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "m_bandoeido",
    "name": "ばんどえいど",
    "category": "midikanamono",
    "categoryName": "みぢかなもの",
    "image": "images/m_bandoeido.png",
    "file": "m_bandoeido.png",
    "prompt": "A realistic-leaning educational picture book illustration of an adhesive medical bandage (band-aid) strip with sterile center pad, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "m_tisshu",
    "name": "てぃっしゅ",
    "category": "midikanamono",
    "categoryName": "みぢかなもの",
    "image": "images/m_tisshu.png",
    "file": "m_tisshu.png",
    "prompt": "A realistic-leaning educational picture book illustration of a cardboard facial tissue box with a soft white tissue paper pulling out from top, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "m_tsumiki",
    "name": "つみき",
    "category": "midikanamono",
    "categoryName": "みぢかなもの",
    "image": "images/m_tsumiki.png",
    "file": "m_tsumiki.png",
    "prompt": "A realistic-leaning educational picture book illustration of a set of natural wooden building blocks stacked into a tower with arch, cylinder, and cubes, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "m_burokku",
    "name": "ぶろっく",
    "category": "midikanamono",
    "categoryName": "みぢかなもの",
    "image": "images/m_burokku.png",
    "file": "m_burokku.png",
    "prompt": "A realistic-leaning educational picture book illustration of a set of colorful plastic interlocking toy brick blocks, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "m_nuigurumi",
    "name": "ぬいぐるみ",
    "category": "midikanamono",
    "categoryName": "みぢかなもの",
    "image": "images/m_nuigurumi.png",
    "file": "m_nuigurumi.png",
    "prompt": "A realistic-leaning educational picture book illustration of a cute soft plush stuffed teddy bear with embroidered smile and button nose, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "m_ningyou",
    "name": "にんぎょう",
    "category": "midikanamono",
    "categoryName": "みぢかなもの",
    "image": "images/m_ningyou.png",
    "file": "m_ningyou.png",
    "prompt": "A realistic-leaning educational picture book illustration of a friendly children cloth doll with embroidered face and yarn hair, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "m_mimagotosetto",
    "name": "ままごと",
    "category": "midikanamono",
    "categoryName": "みぢかなもの",
    "image": "images/m_mimagotosetto.png",
    "file": "m_mimagotosetto.png",
    "prompt": "A realistic-leaning educational picture book illustration of a play toy kitchen cooking set with tiny plastic kettle, pan, and vegetable toy, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "m_minika-",
    "name": "みにきあかー",
    "category": "midikanamono",
    "categoryName": "みぢかなもの",
    "image": "images/m_minika-.png",
    "file": "m_minika-.png",
    "prompt": "A realistic-leaning educational picture book illustration of a pair of die-cast metal toy model cars with rolling wheels, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "m_pazuru",
    "name": "ぱずる",
    "category": "midikanamono",
    "categoryName": "みぢかなもの",
    "image": "images/m_pazuru.png",
    "file": "m_pazuru.png",
    "prompt": "A realistic-leaning educational picture book illustration of a colorful children wooden jigsaw puzzle board with friendly animal pieces fitting in slots, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "m_karuta",
    "name": "かるた",
    "category": "midikanamono",
    "categoryName": "みぢかなもの",
    "image": "images/m_karuta.png",
    "file": "m_karuta.png",
    "prompt": "A realistic-leaning educational picture book illustration of a pair of Japanese karuta picture cards with hiragana syllables and illustrations, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "m_toranpu",
    "name": "とらんぷ",
    "category": "midikanamono",
    "categoryName": "みぢかなもの",
    "image": "images/m_toranpu.png",
    "file": "m_toranpu.png",
    "prompt": "A realistic-leaning educational picture book illustration of a fanned deck of standard playing cards showing hearts, diamonds, spades, and clubs, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "m_kendama",
    "name": "けんだま",
    "category": "midikanamono",
    "categoryName": "みぢかなもの",
    "image": "images/m_kendama.png",
    "file": "m_kendama.png",
    "prompt": "A realistic-leaning educational picture book illustration of a traditional wooden Japanese kendama toy with red wooden ball on string and wooden handle cups, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "m_koma",
    "name": "こま",
    "category": "midikanamono",
    "categoryName": "みぢかなもの",
    "image": "images/m_koma.png",
    "file": "m_koma.png",
    "prompt": "A realistic-leaning educational picture book illustration of a traditional colorful wooden Japanese spinning top with winding cord, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "m_nawatobi",
    "name": "なわとび",
    "category": "midikanamono",
    "categoryName": "みぢかなもの",
    "image": "images/m_nawatobi.png",
    "file": "m_nawatobi.png",
    "prompt": "A realistic-leaning educational picture book illustration of a colorful children jump rope with plastic swivel handles, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "m_shabondama",
    "name": "しゃぼんだま",
    "category": "midikanamono",
    "categoryName": "みぢかなもの",
    "image": "images/m_shabondama.png",
    "file": "m_shabondama.png",
    "prompt": "A realistic-leaning educational picture book illustration of a wand blowing iridescent floating rainbow soap bubbles in air, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "m_suberidai",
    "name": "すべりだい",
    "category": "midikanamono",
    "categoryName": "みぢかなもの",
    "image": "images/m_suberidai.png",
    "file": "m_suberidai.png",
    "prompt": "A realistic-leaning educational picture book illustration of a colorful playground slide with steps and smooth descending metal chute, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "m_buranko",
    "name": "ぶらんこ",
    "category": "midikanamono",
    "categoryName": "みぢかなもの",
    "image": "images/m_buranko.png",
    "file": "m_buranko.png",
    "prompt": "A realistic-leaning educational picture book illustration of a park playground swing set with two rubber seats suspended by safety chains, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "m_tetsubou",
    "name": "てつぼう",
    "category": "midikanamono",
    "categoryName": "みぢかなもの",
    "image": "images/m_tetsubou.png",
    "file": "m_tetsubou.png",
    "prompt": "A realistic-leaning educational picture book illustration of a set of outdoor playground horizontal steel gymnastics exercise bars at three heights, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "m_sunaba",
    "name": "すなば",
    "category": "midikanamono",
    "categoryName": "みぢかなもの",
    "image": "images/m_sunaba.png",
    "file": "m_sunaba.png",
    "prompt": "A realistic-leaning educational picture book illustration of a children outdoor sand play area sandbox with clean golden sand, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "m_shi-so-",
    "name": "しーそー",
    "category": "midikanamono",
    "categoryName": "みぢかなもの",
    "image": "images/m_shi-so-.png",
    "file": "m_shi-so-.png",
    "prompt": "A realistic-leaning educational picture book illustration of a playground seesaw with wooden plank, safety handles, and center fulcrum, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "v_tatsu",
    "name": "たつ",
    "category": "doushi",
    "categoryName": "どうし",
    "image": "images/v_tatsu.png",
    "file": "v_tatsu.png",
    "prompt": "A realistic-leaning educational picture book illustration of a cheerful child standing upright (たつ). Style: Gentle warm Japanese picture book style with delicate watercolor and colored pencil textures, subtle clear contours (good posture, arms by sides, friendly smile, clean sneakers). Completely isolated on a solid pure white background (#ffffff) with no clutter, suitable for children vocabulary flashcard. NOT a photograph, an illustration."
  },
  {
    "id": "v_suwaru",
    "name": "すわる",
    "category": "doushi",
    "categoryName": "どうし",
    "image": "images/v_suwaru.png",
    "file": "v_suwaru.png",
    "prompt": "A realistic-leaning educational picture book illustration of a child sitting politely on a wooden chair (すわる). Style: Gentle warm Japanese picture book style with delicate watercolor and colored pencil textures, subtle clear contours (child in everyday clothes, sitting upright with hands on knees). Completely isolated on a solid pure white background (#ffffff) with no clutter, suitable for children vocabulary flashcard. NOT a photograph, an illustration."
  },
  {
    "id": "v_aruku",
    "name": "あるく",
    "category": "doushi",
    "categoryName": "どうし",
    "image": "images/v_aruku.png",
    "file": "v_aruku.png",
    "prompt": "A realistic-leaning educational picture book illustration of cheerful young boy walking happily with good posture (あるく). Style: Gentle warm Japanese picture book style with delicate watercolor and colored pencil textures, subtle clear contours (walking forward, swinging arms naturally, friendly smile). Completely isolated on a solid pure white background (#ffffff) with no ground clutter, no background scenery, no props, no text, no watermarks, perfectly suited for a vocabulary flashcard for children. NOT a photograph, an illustration."
  },
  {
    "id": "v_hashiru",
    "name": "はしる",
    "category": "doushi",
    "categoryName": "どうし",
    "image": "images/v_hashiru.png",
    "file": "v_hashiru.png",
    "prompt": "A realistic-leaning educational picture book illustration of energetic child running forward with vigor (はしる). Style: Gentle warm Japanese picture book style with delicate watercolor and colored pencil textures, subtle clear contours (leaning forward dynamically, bent knees and pumping elbows, happy smiling expression). Completely isolated on a solid pure white background (#ffffff) with no ground clutter, no background scenery, no props, no text, no watermarks, perfectly suited for a vocabulary flashcard for children. NOT a photograph, an illustration."
  },
  {
    "id": "v_tobu",
    "name": "とぶ",
    "category": "doushi",
    "categoryName": "どうし",
    "image": "images/v_tobu.png",
    "file": "v_tobu.png",
    "prompt": "A realistic-leaning educational picture book illustration of child jumping high in the air with joyful expression (とぶ). Style: Gentle warm Japanese picture book style with delicate watercolor and colored pencil textures, subtle clear contours (both feet off the ground, arms thrown up happily, clothes swaying with motion). Completely isolated on a solid pure white background (#ffffff) with no ground clutter, no background scenery, no props, no text, no watermarks, perfectly suited for a vocabulary flashcard for children. NOT a photograph, an illustration."
  },
  {
    "id": "v_oyogu",
    "name": "およぐ",
    "category": "doushi",
    "categoryName": "どうし",
    "image": "images/v_oyogu.png",
    "file": "v_oyogu.png",
    "prompt": "A realistic-leaning educational picture book illustration of child swimming happily in clear water wearing swim cap and goggles (およぐ). Style: Gentle warm Japanese picture book style with delicate watercolor and colored pencil textures, subtle clear contours (flutter kicking in water, friendly smile, water ripples around). Completely isolated on a solid pure white background (#ffffff) with no ground clutter, no background scenery, no props, no text, no watermarks, perfectly suited for a vocabulary flashcard for children. NOT a photograph, an illustration."
  },
  {
    "id": "v_taberu",
    "name": "たべる",
    "category": "doushi",
    "categoryName": "どうし",
    "image": "images/v_taberu.png",
    "file": "v_taberu.png",
    "prompt": "A realistic-leaning educational picture book illustration of happy child sitting at a table eating delicious food with a spoon (たべる). Style: Gentle warm Japanese picture book style with delicate watercolor and colored pencil textures, subtle clear contours (spoon raised near mouth, cheerful contented expression, clean small bowl). Completely isolated on a solid pure white background (#ffffff) with no ground clutter, no background scenery, no props, no text, no watermarks, perfectly suited for a vocabulary flashcard for children. NOT a photograph, an illustration."
  },
  {
    "id": "v_nomu",
    "name": "のむ",
    "category": "doushi",
    "categoryName": "どうし",
    "image": "images/v_nomu.png",
    "file": "v_nomu.png",
    "prompt": "A realistic-leaning educational picture book illustration of happy child holding a cup with both hands drinking water or milk (のむ). Style: Gentle warm Japanese picture book style with delicate watercolor and colored pencil textures, subtle clear contours (cup tilted gently to mouth, eyes smiling, peaceful expression). Completely isolated on a solid pure white background (#ffffff) with no ground clutter, no background scenery, no props, no text, no watermarks, perfectly suited for a vocabulary flashcard for children. NOT a photograph, an illustration."
  },
  {
    "id": "v_neru",
    "name": "ねる",
    "category": "doushi",
    "categoryName": "どうし",
    "image": "images/v_neru.png",
    "file": "v_neru.png",
    "prompt": "A realistic-leaning educational picture book illustration of peaceful child fast asleep under a warm cozy blanket (ねる). Style: Gentle warm Japanese picture book style with delicate watercolor and colored pencil textures, subtle clear contours (head resting on a soft fluffy pillow, closed calm eyes, gentle smiling in sleep). Completely isolated on a solid pure white background (#ffffff) with no ground clutter, no background scenery, no props, no text, no watermarks, perfectly suited for a vocabulary flashcard for children. NOT a photograph, an illustration."
  },
  {
    "id": "v_okiru",
    "name": "おきる",
    "category": "doushi",
    "categoryName": "どうし",
    "image": "images/v_okiru.png",
    "file": "v_okiru.png",
    "prompt": "A realistic-leaning educational picture book illustration of child waking up in the morning stretching arms happily (おきる). Style: Gentle warm Japanese picture book style with delicate watercolor and colored pencil textures, subtle clear contours (sitting up in bed, big refreshing morning stretch, wide awake friendly smile, sunshine mood). Completely isolated on a solid pure white background (#ffffff) with no ground clutter, no background scenery, no props, no text, no watermarks, perfectly suited for a vocabulary flashcard for children. NOT a photograph, an illustration."
  },
  {
    "id": "v_arau",
    "name": "あらう",
    "category": "doushi",
    "categoryName": "どうし",
    "image": "images/v_arau.png",
    "file": "v_arau.png",
    "prompt": "A realistic-leaning educational picture book illustration of child carefully washing both hands with fluffy soap bubbles at a sink (あらう). Style: Gentle warm Japanese picture book style with delicate watercolor and colored pencil textures, subtle clear contours (lathering palms with white soap suds, shiny water droplets, clean hygiene demonstration). Completely isolated on a solid pure white background (#ffffff) with no ground clutter, no background scenery, no props, no text, no watermarks, perfectly suited for a vocabulary flashcard for children. NOT a photograph, an illustration."
  },
  {
    "id": "v_yomu",
    "name": "よむ",
    "category": "doushi",
    "categoryName": "どうし",
    "image": "images/v_yomu.png",
    "file": "v_yomu.png",
    "prompt": "A realistic-leaning educational picture book illustration of a child happily reading an open picture book (よむ). Style: Gentle warm Japanese picture book style with delicate watercolor and colored pencil textures, subtle clear contours (open illustrated book pages, engaged expression). Completely isolated on a solid pure white background (#ffffff) with no clutter, suitable for children vocabulary flashcard. NOT a photograph, an illustration."
  },
  {
    "id": "v_kaku",
    "name": "かく",
    "category": "doushi",
    "categoryName": "どうし",
    "image": "images/v_kaku.png",
    "file": "v_kaku.png",
    "prompt": "A realistic-leaning educational picture book illustration of a child drawing with a crayon on white drawing paper (かく). Style: Gentle warm Japanese picture book style with delicate watercolor and colored pencil textures, subtle clear contours (holding a red crayon, drawing colorful sunshine and flowers). Completely isolated on a solid pure white background (#ffffff) with no clutter, suitable for children vocabulary flashcard. NOT a photograph, an illustration."
  },
  {
    "id": "v_utau",
    "name": "うたう",
    "category": "doushi",
    "categoryName": "どうし",
    "image": "images/v_utau.png",
    "file": "v_utau.png",
    "prompt": "A realistic-leaning educational picture book illustration of child singing happily with open mouth (うたう). Style: Gentle warm Japanese picture book style with delicate watercolor and colored pencil textures, subtle clear contours (holding hand near chest or singing with music notes floating gently around, happy expression). Completely isolated on a solid pure white background (#ffffff) with no ground clutter, no background scenery, no props, no text, no watermarks, perfectly suited for a vocabulary flashcard for children. NOT a photograph, an illustration."
  },
  {
    "id": "v_odoru",
    "name": "おどる",
    "category": "doushi",
    "categoryName": "どうし",
    "image": "images/v_odoru.png",
    "file": "v_odoru.png",
    "prompt": "A realistic-leaning educational picture book illustration of child dancing happily with playful dynamic pose (おどる). Style: Gentle warm Japanese picture book style with delicate watercolor and colored pencil textures, subtle clear contours (arms raised rhythmically, one foot lifted in dance, joyful happy energy). Completely isolated on a solid pure white background (#ffffff) with no ground clutter, no background scenery, no props, no text, no watermarks, perfectly suited for a vocabulary flashcard for children. NOT a photograph, an illustration."
  },
  {
    "id": "v_warau",
    "name": "わらう",
    "category": "doushi",
    "categoryName": "どうし",
    "image": "images/v_warau.png",
    "file": "v_warau.png",
    "prompt": "A realistic-leaning educational picture book illustration of child laughing joyfully with bright smiling face (わらう). Style: Gentle warm Japanese picture book style with delicate watercolor and colored pencil textures, subtle clear contours (happy curved eyes, open mouth with cheerful laughter, rosy cheeks, full of joy). Completely isolated on a solid pure white background (#ffffff) with no ground clutter, no background scenery, no props, no text, no watermarks, perfectly suited for a vocabulary flashcard for children. NOT a photograph, an illustration."
  },
  {
    "id": "v_migaku",
    "name": "みがく",
    "category": "doushi",
    "categoryName": "どうし",
    "image": "images/v_migaku.png",
    "file": "v_migaku.png",
    "prompt": "A realistic-leaning educational picture book illustration of a child holding a toothbrush brushing teeth carefully, with gentle foam bubbles and mirror, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "v_kigaeru",
    "name": "きがえる",
    "category": "doushi",
    "categoryName": "どうし",
    "image": "images/v_kigaeru.png",
    "file": "v_kigaeru.png",
    "prompt": "A realistic-leaning educational picture book illustration of a child neatly changing clothes from pajamas into daytime t-shirt and pants, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "v_haku",
    "name": "はく",
    "category": "doushi",
    "categoryName": "どうし",
    "image": "images/v_haku.png",
    "file": "v_haku.png",
    "prompt": "A realistic-leaning educational picture book illustration of a child sitting on the entryway step putting on shoes carefully, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "v_nugu",
    "name": "ぬぐ",
    "category": "doushi",
    "categoryName": "どうし",
    "image": "images/v_nugu.png",
    "file": "v_nugu.png",
    "prompt": "A realistic-leaning educational picture book illustration of a child taking off boots and socks at the door, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "v_kaburu",
    "name": "かぶる",
    "category": "doushi",
    "categoryName": "どうし",
    "image": "images/v_kaburu.png",
    "file": "v_kaburu.png",
    "prompt": "A realistic-leaning educational picture book illustration of a child placing a yellow sun hat on head with both hands, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "v_fuku",
    "name": "ふく",
    "category": "doushi",
    "categoryName": "どうし",
    "image": "images/v_fuku.png",
    "file": "v_fuku.png",
    "prompt": "A realistic-leaning educational picture book illustration of a child wiping hands dry with a clean soft cotton towel, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "v_dekakeru",
    "name": "でかける",
    "category": "doushi",
    "categoryName": "どうし",
    "image": "images/v_dekakeru.png",
    "file": "v_dekakeru.png",
    "prompt": "A realistic-leaning educational picture book illustration of a child with backpack waving goodbye opening the front door to go out, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "v_katazukeru",
    "name": "かたづける",
    "category": "doushi",
    "categoryName": "どうし",
    "image": "images/v_katazukeru.png",
    "file": "v_katazukeru.png",
    "prompt": "A realistic-leaning educational picture book illustration of a child tidying up colorful toy blocks placing them into a toy box, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "v_tetsudau",
    "name": "てつだう",
    "category": "doushi",
    "categoryName": "どうし",
    "image": "images/v_tetsudau.png",
    "file": "v_tetsudau.png",
    "prompt": "A realistic-leaning educational picture book illustration of a child helping set the dinner table by carrying small bowls carefully, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "v_suteru",
    "name": "すてる",
    "category": "doushi",
    "categoryName": "どうし",
    "image": "images/v_suteru.png",
    "file": "v_suteru.png",
    "prompt": "A realistic-leaning educational picture book illustration of a child dropping a paper scrap into an indoor wastebasket trash can, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "v_osu",
    "name": "おす",
    "category": "doushi",
    "categoryName": "どうし",
    "image": "images/v_osu.png",
    "file": "v_osu.png",
    "prompt": "A realistic-leaning educational picture book illustration of a finger pressing a round wall doorbell button / elevator button with a chime ring, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "v_te-o-furu",
    "name": "てをふる",
    "category": "doushi",
    "categoryName": "どうし",
    "image": "images/v_te-o-furu.png",
    "file": "v_te-o-furu.png",
    "prompt": "A realistic-leaning educational picture book illustration of a cheerful child raising an open hand and waving hello/goodbye, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "v_ojigi",
    "name": "おじぎする",
    "category": "doushi",
    "categoryName": "どうし",
    "image": "images/v_ojigi.png",
    "file": "v_ojigi.png",
    "prompt": "A realistic-leaning educational picture book illustration of a polite Japanese child bowing slightly in friendly greeting with hands at sides, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "v_ugai",
    "name": "うがいする",
    "category": "doushi",
    "categoryName": "どうし",
    "image": "images/v_ugai.png",
    "file": "v_ugai.png",
    "prompt": "A realistic-leaning educational picture book illustration of a child with head tilted back gargling water from a cup, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "v_hana-o-kamu",
    "name": "はなをかむ",
    "category": "doushi",
    "categoryName": "どうし",
    "image": "images/v_hana-o-kamu.png",
    "file": "v_hana-o-kamu.png",
    "prompt": "A realistic-leaning educational picture book illustration of a child gently blowing nose with a soft tissue paper, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "v_kao-o-arau",
    "name": "かおをあらう",
    "category": "doushi",
    "categoryName": "どうし",
    "image": "images/v_kao-o-arau.png",
    "file": "v_kao-o-arau.png",
    "prompt": "A realistic-leaning educational picture book illustration of a child washing face with cupped hands splashing water over a sink, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "v_tsukuru",
    "name": "つくる",
    "category": "doushi",
    "categoryName": "どうし",
    "image": "images/v_tsukuru.png",
    "file": "v_tsukuru.png",
    "prompt": "A realistic-leaning educational picture book illustration of a child assembling wooden craft blocks creating a house, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "v_shagamu",
    "name": "しゃがむ",
    "category": "doushi",
    "categoryName": "どうし",
    "image": "images/v_shagamu.png",
    "file": "v_shagamu.png",
    "prompt": "A realistic-leaning educational picture book illustration of a child crouching / squatting low on heels observing an ant on ground, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "v_hau",
    "name": "はう",
    "category": "doushi",
    "categoryName": "どうし",
    "image": "images/v_hau.png",
    "file": "v_hau.png",
    "prompt": "A realistic-leaning educational picture book illustration of a baby crawling forward on hands and knees on a soft play mat, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "v_nekorobu",
    "name": "ねころぶ",
    "category": "doushi",
    "categoryName": "どうし",
    "image": "images/v_nekorobu.png",
    "file": "v_nekorobu.png",
    "prompt": "A realistic-leaning educational picture book illustration of a child lying comfortably on back on grassy lawn looking up at blue sky, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "v_te-o-tataku",
    "name": "てをたたく",
    "category": "doushi",
    "categoryName": "どうし",
    "image": "images/v_te-o-tataku.png",
    "file": "v_te-o-tataku.png",
    "prompt": "A realistic-leaning educational picture book illustration of a happy child clapping hands together rhythmically with sound marks, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "v_te-o-tsunagu",
    "name": "てをつなぐ",
    "category": "doushi",
    "categoryName": "どうし",
    "image": "images/v_te-o-tsunagu.png",
    "file": "v_te-o-tsunagu.png",
    "prompt": "A realistic-leaning educational picture book illustration of two children holding hands walking together happily, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "v_yubisashu",
    "name": "ゆびさす",
    "category": "doushi",
    "categoryName": "どうし",
    "image": "images/v_yubisashu.png",
    "file": "v_yubisashu.png",
    "prompt": "A realistic-leaning educational picture book illustration of a child extending index finger pointing towards a bird in the sky, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "v_mochiageru",
    "name": "もちあげる",
    "category": "doushi",
    "categoryName": "どうし",
    "image": "images/v_mochiageru.png",
    "file": "v_mochiageru.png",
    "prompt": "A realistic-leaning educational picture book illustration of a child lifting up a toy box from the floor with both hands, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "v_hakobu",
    "name": "はこぶ",
    "category": "doushi",
    "categoryName": "どうし",
    "image": "images/v_hakobu.png",
    "file": "v_hakobu.png",
    "prompt": "A realistic-leaning educational picture book illustration of a child carefully carrying a tray with cup and plate, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "v_hipparu",
    "name": "ひっぱる",
    "category": "doushi",
    "categoryName": "どうし",
    "image": "images/v_hipparu.png",
    "file": "v_hipparu.png",
    "prompt": "A realistic-leaning educational picture book illustration of a child pulling a toy wooden wagon on a string, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "v_nageru",
    "name": "なげる",
    "category": "doushi",
    "categoryName": "どうし",
    "image": "images/v_nageru.png",
    "file": "v_nageru.png",
    "prompt": "A realistic-leaning educational picture book illustration of a cheerful child, full body view, dynamically throwing a yellow softball forward, standing in a pitching pose with both arms visible, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "v_toru",
    "name": "とる",
    "category": "doushi",
    "categoryName": "どうし",
    "image": "images/v_toru.png",
    "file": "v_toru.png",
    "prompt": "A realistic-leaning educational picture book illustration of a child catching a flying soft ball with both open hands, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "v_keru",
    "name": "ける",
    "category": "doushi",
    "categoryName": "どうし",
    "image": "images/v_keru.png",
    "file": "v_keru.png",
    "prompt": "A realistic-leaning educational picture book illustration of a child kicking a soccer ball on a grass field, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "v_noboru",
    "name": "のぼる",
    "category": "doushi",
    "categoryName": "どうし",
    "image": "images/v_noboru.png",
    "file": "v_noboru.png",
    "prompt": "A realistic-leaning educational picture book illustration of a child climbing up the steps of a playground slide, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "v_oriru",
    "name": "おりる",
    "category": "doushi",
    "categoryName": "どうし",
    "image": "images/v_oriru.png",
    "file": "v_oriru.png",
    "prompt": "A realistic-leaning educational picture book illustration of a child stepping down the low platform safely, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "v_watasu",
    "name": "わたす",
    "category": "doushi",
    "categoryName": "どうし",
    "image": "images/v_watasu.png",
    "file": "v_watasu.png",
    "prompt": "A realistic-leaning educational picture book illustration of two polite children standing side by side, one child handing a notebook politely to the other friend, smiling expressions, upper body view, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "v_morau",
    "name": "もらう",
    "category": "doushi",
    "categoryName": "どうし",
    "image": "images/v_morau.png",
    "file": "v_morau.png",
    "prompt": "A realistic-leaning educational picture book illustration of a delighted child receiving a wrapped gift present box with both hands, happy excited smile, upper body portrait, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "v_hirow",
    "name": "ひろう",
    "category": "doushi",
    "categoryName": "どうし",
    "image": "images/v_hirow.png",
    "file": "v_hirow.png",
    "prompt": "A realistic-leaning educational picture book illustration of a child bending down picking up a fallen acorn from the ground, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "v_tsukamu",
    "name": "つかむ",
    "category": "doushi",
    "categoryName": "どうし",
    "image": "images/v_tsukamu.png",
    "file": "v_tsukamu.png",
    "prompt": "A realistic-leaning educational picture book illustration of a child gripping a handrail firmly on stairs, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "v_kakureru",
    "name": "かくれる",
    "category": "doushi",
    "categoryName": "どうし",
    "image": "images/v_kakureru.png",
    "file": "v_kakureru.png",
    "prompt": "A realistic-leaning educational picture book illustration of a child hiding behind a tree trunk playing hide and seek, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "v_mitsukeru",
    "name": "みつける",
    "category": "doushi",
    "categoryName": "どうし",
    "image": "images/v_mitsukeru.png",
    "file": "v_mitsukeru.png",
    "prompt": "A realistic-leaning educational picture book illustration of a delighted child pointing and discovering a hidden treasure box, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "v_oikakeru",
    "name": "おいかける",
    "category": "doushi",
    "categoryName": "どうし",
    "image": "images/v_oikakeru.png",
    "file": "v_oikakeru.png",
    "prompt": "A realistic-leaning educational picture book illustration of a child running to chase a fluttering yellow butterfly, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "v_nigeru",
    "name": "にげる",
    "category": "doushi",
    "categoryName": "どうし",
    "image": "images/v_nigeru.png",
    "file": "v_nigeru.png",
    "prompt": "A realistic-leaning educational picture book illustration of a little rabbit darting away swiftly, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "v_nuru",
    "name": "ぬる",
    "category": "doushi",
    "categoryName": "どうし",
    "image": "images/v_nuru.png",
    "file": "v_nuru.png",
    "prompt": "A realistic-leaning educational picture book illustration of a child coloring in a drawing neatly with a blue colored pencil, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "v_kiru",
    "name": "きる",
    "category": "doushi",
    "categoryName": "どうし",
    "image": "images/v_kiru.png",
    "file": "v_kiru.png",
    "prompt": "A realistic-leaning educational picture book illustration of child safety scissors cutting along a straight dashed line on paper, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "v_haru",
    "name": "はる",
    "category": "doushi",
    "categoryName": "どうし",
    "image": "images/v_haru.png",
    "file": "v_haru.png",
    "prompt": "A realistic-leaning educational picture book illustration of a cheerful child sticking colorful origami paper onto a sketchbook with a glue stick, sitting neatly, showing the child smiling face and both hands, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "v_oru",
    "name": "おる",
    "category": "doushi",
    "categoryName": "どうし",
    "image": "images/v_oru.png",
    "file": "v_oru.png",
    "prompt": "A realistic-leaning educational picture book illustration of folding a colorful square origami paper neatly along diagonal crease, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "v_kiku",
    "name": "きく",
    "category": "doushi",
    "categoryName": "どうし",
    "image": "images/v_kiku.png",
    "file": "v_kiku.png",
    "prompt": "A realistic-leaning educational picture book illustration of a child cupping a hand to ear listening attentively to music, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "v_miru",
    "name": "みる",
    "category": "doushi",
    "categoryName": "どうし",
    "image": "images/v_miru.png",
    "file": "v_miru.png",
    "prompt": "A realistic-leaning educational picture book illustration of a child looking through a magnifying glass at a green leaf with wide curious eyes, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "v_pianowohiku",
    "name": "ぴあのをひく",
    "category": "doushi",
    "categoryName": "どうし",
    "image": "images/v_pianowohiku.png",
    "file": "v_pianowohiku.png",
    "prompt": "A realistic-leaning educational picture book illustration of a child pressing piano keys with fingers on keyboard making music, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "v_te-o-ageru",
    "name": "てをあげる",
    "category": "doushi",
    "categoryName": "どうし",
    "image": "images/v_te-o-ageru.png",
    "file": "v_te-o-ageru.png",
    "prompt": "A realistic-leaning educational picture book illustration of a student in classroom raising right hand straight up to answer question, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "v_hanasu-talk",
    "name": "おはなしする",
    "category": "doushi",
    "categoryName": "どうし",
    "image": "images/v_hanasu-talk.png",
    "file": "v_hanasu-talk.png",
    "prompt": "A realistic-leaning educational picture book illustration of two children talking together pleasantly facing each other, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "v_tsutaeru",
    "name": "つたえる",
    "category": "doushi",
    "categoryName": "どうし",
    "image": "images/v_tsutaeru.png",
    "file": "v_tsutaeru.png",
    "prompt": "A realistic-leaning educational picture book illustration of a child speaking with cupped hands delivering a message, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "v_tsumu",
    "name": "つむ",
    "category": "doushi",
    "categoryName": "どうし",
    "image": "images/v_tsumu.png",
    "file": "v_tsumu.png",
    "prompt": "A realistic-leaning educational picture book illustration of stacking wooden blocks carefully one on top of another without tumbling, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "v_kuzusu",
    "name": "くずす",
    "category": "doushi",
    "categoryName": "どうし",
    "image": "images/v_kuzusu.png",
    "file": "v_kuzusu.png",
    "prompt": "A realistic-leaning educational picture book illustration of a tall block tower tumbling down playfully, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "v_kaku-draw",
    "name": "おえかきする",
    "category": "doushi",
    "categoryName": "どうし",
    "image": "images/v_kaku-draw.png",
    "file": "v_kaku-draw.png",
    "prompt": "A realistic-leaning educational picture book illustration of a child drawing a smiling sunshine picture on drawing paper, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "v_nikkori",
    "name": "にっこりする",
    "category": "doushi",
    "categoryName": "どうし",
    "image": "images/v_nikkori.png",
    "file": "v_nikkori.png",
    "prompt": "A realistic-leaning educational picture book illustration of a child with a warm gentle smiling face and bright friendly eyes, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "v_naku",
    "name": "なく",
    "category": "doushi",
    "categoryName": "どうし",
    "image": "images/v_naku.png",
    "file": "v_naku.png",
    "prompt": "A realistic-leaning educational picture book illustration of a child crying with gentle tears on cheeks comforting face, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "v_odoroku",
    "name": "おどろく",
    "category": "doushi",
    "categoryName": "どうし",
    "image": "images/v_odoroku.png",
    "file": "v_odoroku.png",
    "prompt": "A realistic-leaning educational picture book illustration of a child with wide round eyes and open mouth looking pleasantly surprised, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "v_okoru",
    "name": "おこる",
    "category": "doushi",
    "categoryName": "どうし",
    "image": "images/v_okoru.png",
    "file": "v_okoru.png",
    "prompt": "A realistic-leaning educational picture book illustration of a child with slightly pouted cheeks and crossed arms looking cross, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "v_yorokobu",
    "name": "よろこぶ",
    "category": "doushi",
    "categoryName": "どうし",
    "image": "images/v_yorokobu.png",
    "file": "v_yorokobu.png",
    "prompt": "A realistic-leaning educational picture book illustration of a delighted child jumping for joy with both fists pumped in celebration, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "v_akushu",
    "name": "あくしゅする",
    "category": "doushi",
    "categoryName": "どうし",
    "image": "images/v_akushu.png",
    "file": "v_akushu.png",
    "prompt": "A realistic-leaning educational picture book illustration of two friendly children standing together smiling and shaking hands warmly in friendship, upper body view, cheerful happy faces, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "v_yubikiri",
    "name": "ゆびきりする",
    "category": "doushi",
    "categoryName": "どうし",
    "image": "images/v_yubikiri.png",
    "file": "v_yubikiri.png",
    "prompt": "A realistic-leaning educational picture book illustration of two friendly children facing each other, smiling warmly and hooking their pinky fingers together in a pinky promise, upper body view, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "v_itadaku",
    "name": "いただきます",
    "category": "doushi",
    "categoryName": "どうし",
    "image": "images/v_itadaku.png",
    "file": "v_itadaku.png",
    "prompt": "A realistic-leaning educational picture book illustration of a cheerful child sitting politely with palms pressed together in front of the chest in the traditional Japanese itadakimasu greeting pose before eating, happy smiling expression, cute meal tray with bowl of rice and soup on table, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "v_gochisousama",
    "name": "ごちそうさま",
    "category": "doushi",
    "categoryName": "どうし",
    "image": "images/v_gochisousama.png",
    "file": "v_gochisousama.png",
    "prompt": "A realistic-leaning educational picture book illustration of a polite child with hands pressed together saying gochisousama after finishing a meal, empty bowl on the table, satisfied happy expression, upper body view, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "v_gomen-nasai",
    "name": "あやまる",
    "category": "doushi",
    "categoryName": "どうし",
    "image": "images/v_gomen-nasai.png",
    "file": "v_gomen-nasai.png",
    "prompt": "A realistic-leaning educational picture book illustration of a child bowing head slightly in a gentle sincere apology, hands neatly placed at sides, apologetic respectful expression, upper body portrait, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "v_tatamu",
    "name": "たたむ",
    "category": "doushi",
    "categoryName": "どうし",
    "image": "images/v_tatamu.png",
    "file": "v_tatamu.png",
    "prompt": "A realistic-leaning educational picture book illustration of a child carefully folding a clean laundry t-shirt neatly into a square, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "v_hodoku",
    "name": "ほどく",
    "category": "doushi",
    "categoryName": "どうし",
    "image": "images/v_hodoku.png",
    "file": "v_hodoku.png",
    "prompt": "A realistic-leaning educational picture book illustration of loosening and untying a knotted string ribbon, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "v_haku-sweeping",
    "name": "ほうきではく",
    "category": "doushi",
    "categoryName": "どうし",
    "image": "images/v_haku-sweeping.png",
    "file": "v_haku-sweeping.png",
    "prompt": "A realistic-leaning educational picture book illustration of a child sweeping the floor dust with a broom and dustpan, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "v_nobi-o-suru",
    "name": "のびをする",
    "category": "doushi",
    "categoryName": "どうし",
    "image": "images/v_nobi-o-suru.png",
    "file": "v_nobi-o-suru.png",
    "prompt": "A realistic-leaning educational picture book illustration of a child stretching arms high above head stretching body after waking up, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  },
  {
    "id": "v_akubi",
    "name": "あくびする",
    "category": "doushi",
    "categoryName": "どうし",
    "image": "images/v_akubi.png",
    "file": "v_akubi.png",
    "prompt": "A realistic-leaning educational picture book illustration of a sleepy child covering mouth and yawning, clean crisp Japanese picture book style with fresh vibrant clear colors, delicate watercolor and clean pencil contours, completely isolated on a solid pure white background (#ffffff), pure white paper, no yellow tint, no scenery, no ground shadow, no clutter, no text, children vocabulary illustration"
  }
];

  const VOCAB_BY_ID = new Map();
  const VOCAB_BY_NAME = new Map();

  VOCAB_LIST.forEach(item => {
    VOCAB_BY_ID.set(item.id, item);
    if (!VOCAB_BY_NAME.has(item.name)) {
      VOCAB_BY_NAME.set(item.name, []);
    }
    VOCAB_BY_NAME.get(item.name).push(item);
  });

  function findVocabByName(name) {
    return VOCAB_BY_NAME.get(name) || [];
  }

  function findVocabById(id) {
    return VOCAB_BY_ID.get(id) || null;
  }

  function searchVocab(query) {
    if (!query) return [];
    const q = query.trim();
    return VOCAB_LIST.filter(item => item.name.includes(q) || (item.prompt && item.prompt.toLowerCase().includes(q.toLowerCase())));
  }

  const VocabDB = {
    list: VOCAB_LIST,
    byId: VOCAB_BY_ID,
    byName: VOCAB_BY_NAME,
    findByName: findVocabByName,
    findById: findVocabById,
    search: searchVocab
  };

  if (typeof module !== "undefined" && module.exports) {
    module.exports = VocabDB;
  } else {
    global.VocabDB = VocabDB;
  }
})(typeof window !== "undefined" ? window : global);
