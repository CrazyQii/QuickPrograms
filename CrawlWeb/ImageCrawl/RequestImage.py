"""
图片爬虫，拉取必应上面的图片
"""

from bs4 import BeautifulSoup
import requests
import csv
import time


def getHtml(url) -> str:
    """ 请求页面 """
    headers = {
        "scheme": "https",
        "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
        "accept-encoding": "gzip, deflate, br",
        "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7,zh-TW;q=0.6",
        "cookie": "MMCA=ID=827EB542286C406F835228195795C305; _EDGE_V=1; MUID=32E47DAB1F9967482A3E6D391EB76621; MUIDB=32E47DAB1F9967482A3E6D391EB76621; SRCHD=AF=NOFORM; SRCHUID=V=2&GUID=8FBC85FC8D29447995C68A6F19A55420&dmnchg=1; _ITAB=STAB=TR; _clck=7bje0f|1|ewv|0; _TTSS_IN=hist=WyJkYSIsInpoLUhhbnMiLCJlbiIsImF1dG8tZGV0ZWN0Il0=; _tarLang=default=zh-Hans; _TTSS_OUT=hist=WyJlbiIsInpoLUhhbnMiXQ==; ABDEF=V=13&ABDV=11&MRNB=1643016126400&MRB=0; ZHCHATWEAKATTRACT=TRUE; _SS=SID=3E32FF2C2AAE657802C2EE1B2BC86454&PC=U316; SRCHS=PC=U316; SUID=M; ZHCHATSTRONGATTRACT=TRUE; _EDGE_S=SID=3E32FF2C2AAE657802C2EE1B2BC86454&ui=zh-cn; imgv=lodlg=2&gts=20220126; SRCHUSR=DOB=20211108&T=1643163060000&TPC=1643159347000; _HPVN=CS=eyJQbiI6eyJDbiI6MzUsIlN0IjoyLCJRcyI6MCwiUHJvZCI6IlAifSwiU2MiOnsiQ24iOjM1LCJTdCI6MCwiUXMiOjAsIlByb2QiOiJIIn0sIlF6Ijp7IkNuIjozNSwiU3QiOjEsIlFzIjowLCJQcm9kIjoiVCJ9LCJBcCI6dHJ1ZSwiTXV0ZSI6dHJ1ZSwiTGFkIjoiMjAyMi0wMS0yNlQwMDowMDowMFoiLCJJb3RkIjowLCJHd2IiOjAsIkRmdCI6bnVsbCwiTXZzIjowLCJGbHQiOjAsIkltcCI6MTAzMH0=; ipv6=hit=1643166675047&t=4; SRCHHPGUSR=SRCHLANG=zh-Hans&BZA=0&BRW=W&BRH=M&CW=1440&CH=753&SW=1440&SH=960&DPR=1.5&UTC=480&DM=0&WTS=63778759860&HV=1643163256; SNRHOP=I=&TS=",
        "user-agent": "Mozilla / 5.0(Windows NT 10.0;Win64;x64) AppleWebKit / 537.36(KHTML, likeGecko) Chrome / 97.0.4692.99Safari / 537.36"
    }

    r = requests.get(url, headers=headers)
    if r.status_code == 200:
        return r.content


def parseHtmlToLinks(html) -> list:
    """ 解析第一层页面 """
    soup = BeautifulSoup(html, 'html.parser')
    # 查找指定子节点
    links = soup.find_all("div", "img_cont hoff")
    return links


if __name__ == '__main__':
    baseUrl = "https://cn.bing.com/images/search?q=%e5%87%ba%e7%a7%9f%e8%bd%a6%e5%8f%91%e7%a5%a8&form=QBIR&first=1&tsc=ImageBasicHover"
    # 获取第一层页面
    html = getHtml(baseUrl)
    print(html)
    # 解析链接
    links = parseHtmlToLinks(html)
    for link in links:
        data = [link.get_text(), f'https://pmichina.org{link.find("a")["href"]}']
        print('已添加：' + str(data))
        # appendCsv(data)
    time.sleep(1)