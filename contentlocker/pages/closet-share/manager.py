import os
import shutil
import json
import glob

# 設定
RAW_DIR = 'raw_images'      # 元画像置き場
TARGET_DIR = 'images'       # 移動先
JSON_FILE = 'items.json'    # 更新するJSONファイル
START_ID = 4                # itemIDの開始番号（既存がある場合は調整してください）

def main():
    # 1. 画像ファイルの取得（jpg, jpeg, png, pngなど）
    extensions = ['*.jpg', '*.jpeg', '*.png', '*.HEIC']
    files = []
    for ext in extensions:
        files.extend(glob.glob(os.path.join(RAW_DIR, ext)))
        files.extend(glob.glob(os.path.join(RAW_DIR, ext.upper()))) # 大文字対応
    
    # 名前順にソート（これで表・裏のペアを保証する）
    files.sort()

    if not files:
        print("画像が見つかりません。raw_imagesフォルダに画像を入れてください。")
        return

    print(f"{len(files)} 枚の画像を検出しました。処理を開始します...")

    # 既存のJSONを読み込む（あれば）
    current_items = []
    if os.path.exists(JSON_FILE):
        with open(JSON_FILE, 'r', encoding='utf-8') as f:
            try:
                current_items = json.load(f)
                # 既存のIDと被らないようにSTART_IDを調整するロジック（簡易版）
                if current_items:
                    last_id_str = current_items[-1]['id'].replace('item', '')
                    if last_id_str.isdigit():
                         global START_ID
                         START_ID = int(last_id_str) + 1
                         print(f"既存のデータがあります。ID: item{START_ID:03} から開始します。")
            except:
                pass

    new_items = []
    
    # 2枚1組でループ処理
    # range(0, データの数, 2) で2つ飛ばしにする
    for i in range(0, len(files), 2):
        # ID生成 (item001, item002...)
        item_id = f"item{START_ID:03}"
        START_ID += 1
        
        # フォルダ作成
        item_dir = os.path.join(TARGET_DIR, item_id)
        os.makedirs(item_dir, exist_ok=True)

        # 画像ペアの取得（奇数枚の場合は最後だけsubなしにする）
        main_img_src = files[i]
        sub_img_src = files[i+1] if i+1 < len(files) else None

        # 画像の拡張子を取得
        _, ext_main = os.path.splitext(main_img_src)
        
        # 移動後のパス
        main_img_dest = os.path.join(item_dir, f"main{ext_main.lower()}")
        images_list = [main_img_dest.replace(os.sep, '/')] # Windows等のパス区切り文字を/に統一

        # メイン画像の移動（コピーではなく移動にします）
        shutil.move(main_img_src, main_img_dest)

        if sub_img_src:
            _, ext_sub = os.path.splitext(sub_img_src)
            sub_img_dest = os.path.join(item_dir, f"sub{ext_sub.lower()}")
            shutil.move(sub_img_src, sub_img_dest)
            images_list.append(sub_img_dest.replace(os.sep, '/'))

        # JSONデータの雛形を作成
        item_data = {
            "id": item_id,
            "name": f"未入力（{item_id}）", # 後で書き換える
            "category": "tops",           # デフォルト値
            "size": "M",                  # デフォルト値
            "color": "black",             # デフォルト値
            "price": 0,
            "description": "説明文を入力してください",
            "images": images_list
        }
        
        new_items.append(item_data)
        print(f"処理完了: {item_id}")

    # データを結合
    all_items = current_items + new_items

    # JSON書き込み
    with open(JSON_FILE, 'w', encoding='utf-8') as f:
        json.dump(all_items, f, indent=4, ensure_ascii=False)

    print("------------------------------------------------")
    print("完了しました！")
    print(f"raw_imagesフォルダの画像は images/ 各フォルダに移動されました。")
    print(f"{JSON_FILE} をVSCodeで開いて、商品情報を編集してください。")

if __name__ == "__main__":
    main()