import datetime
import fitz
import os


def pyMuPDF_fitz():
    try:
        # 输入所有文件名称
        dir_path = input("输入目录路径(结尾添加/): ")
        image_path = input("输入需要存储的路径(结尾添加/): ")

        for pdf in os.listdir(path=dir_path):
            if pdf.endswith(".jpg") or pdf.endswith(".png"):
                continue

            pdf_path = dir_path + pdf
            startTime_pdf2img = datetime.datetime.now()  # 开始时间

            pdf_doc = fitz.open(pdf_path)
            for pg in range(pdf_doc.pageCount):
                page = pdf_doc[pg]
                rotate = int(0)
                # 每个尺寸的缩放系数为1.3，这将为我们生成分辨率提高2.6的图像。
                # 此处若是不做设置，默认图片大小为：792X612, dpi=96
                zoom_x = 1.33333333  # (1.33333333-->1056x816)   (2-->1584x1224)
                zoom_y = 1.33333333
                mat = fitz.Matrix(zoom_x, zoom_y).preRotate(rotate)
                pix = page.getPixmap(matrix=mat, alpha=False)

                if not os.path.exists(image_path):  # 判断存放图片的文件夹是否存在
                    os.makedirs(image_path)  # 若图片文件夹不存在就创建

                print(f'{image_path}{pdf}-images-{pg}.jpg')
                pix.save(f'{image_path}{pdf}-images-{pg}.jpg')  # 将图片写入指定的文件夹内

            endTime_pdf2img = datetime.datetime.now()  # 结束时间
            print('pdf2img时间=', (endTime_pdf2img - startTime_pdf2img).seconds)
    except FileExistsError as e:
        print("图片批量修改失败：文件不存在-" + str(e))
    except Exception as e:
        print("图片批量修改失败：未知错误-" + str(e))



