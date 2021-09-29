import os
import time

opt = None



# 批量修改图片名称
def RenameBatchImages():
    try:
        # 输入所有文件名称
        path = input("输入目录路径(结尾添加/): ")
        fileName = input("图片前缀名称: ")
        fileStartNumber = input("图片起始编号(默认1): ")
        fileformat = input("图片格式(jpg\png): ")

        # 获取该目录下的所有文件
        fileList = os.listdir(path=path)

        print("开始修改图片名称···")
        time.sleep(1)

        if fileStartNumber is not None:
            fileStartNumber = 1
        
        for fName in fileList:
            # 设置旧文件名称
            oldFileName = path + os.sep + fName

            # 设置新文件名称
            newFileName = path + os.sep + fileName + str(fileStartNumber + 1) + "." + fileformat
            
            # 修改文件名称
            os.rename(oldFileName, newFileName)

            fileStartNumber += 1

            print(f"原名称：{oldFileName} ===> 新名称：{newFileName}" )

        print("图片名称修改结束")
        print()
    except FileExistsError as e:
        print("图片批量修改失败：文件不存在-" + str(e))
    except Exception as e:
        print("图片批量修改失败：未知错误-" + str(e))
    

while opt != 0:
    print("=======常用操作======")
    print()
    print("1.批量修改图片名称")
    print("0.退出")
    print()
    print("====================")


    opt = input("输入操作选择(数字):")
    if opt == "1":
        RenameBatchImages()
    elif opt == "0":
        print("退出系统")
        exit()

os.system("pause")