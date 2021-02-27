#!/usr/bin/env python3
# *coding: utf-8

import sys
import os

if __name__ == '__main__':
    # ディレクトリの指定があれば、移動
    target_dir = sys.argv[1] or None
    if target_dir:
        os.chdir(target_dir)

    # 現フォルダの全ファイル名を取得
    filelist = os.listdir('.')

    output = ''
    # ファイルの中身を取得
    for filepath in filelist:
        # 「## ＜拡張子なしのファイル名＞」で章扱い
        output += f"## {os.path.splitext(filepath)[0]}\n"
        with open(filepath, 'r', encoding="utf-8_sig") as f:
            output += f.read()
            output += "\n\n"

    # 全部の中身を連結して、1つtxtファイルに出力
    with open('_tmp.txt', 'w', encoding="utf-8_sig") as f:
        f.write(output)
