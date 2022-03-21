import os
from modify_file_name import RenameBatchImages
from pdf_to_image import pyMuPDF_fitz

if __name__ == '__main__':

    opt = None

    while opt != 0:
        print("=======常用操作======")
        print()
        print("1.批量修改图片名称")
        print("2.PDF文件转图片")
        print("0.退出")
        print()
        print("====================")

        opt = input("输入操作选择(数字):")
        if opt == "1":
            RenameBatchImages()
        elif opt == "2":
            pyMuPDF_fitz()
        elif opt == "0":
            print("退出系统")
            exit()
        else:
            print("选择无效")

    os.system("pause")
