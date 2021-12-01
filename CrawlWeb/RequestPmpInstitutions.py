"""
网页爬虫，查询项目管理职业资格认证官网中的合作机构
"""

from bs4 import BeautifulSoup
import requests
import csv
import time


def getHtml(url) -> str:
    """ 请求页面 """
    headers = {
        'Host': 'exam.chinapmp.cn',
        'Upgrade-Insecure-Requests': '1',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.45 Safari/537.36',
        'Cookie': 'SYSTEM_ONLY_COOKIE_NAME=9C8FAC2D055C49B8248FE7F7413FC985; SYSTEM_TEMP_COOKIE_NAME=E70CEF55897C53713099C1F505D9ADBB; Hm_lvt_ce48bdfcf41472b5d96a1d490af19487=1638319784; CSRF=0b573e1842de4353b91f3abb099bde33.1638351152.fc752095d9aea82adc7366d229fb4351; Hm_lpvt_ce48bdfcf41472b5d96a1d490af19487=1638322338'
    }
    
    r = requests.get(url, headers=headers)
    if r.status_code == 200:
       return r.content

def parseHtmlToLinks(html) -> list:
    """ 解析第一层页面 """
    soup = BeautifulSoup(html, 'html.parser')
    # 查找指定子节点
    content = soup.find("div", "content")
    links = content.find_all("a", target="_blank")
    return links

def parseHtmlToDetailInfo(html) -> None:
    """ 解析第二层页面 """
    detail = []
    soup = BeautifulSoup(html, 'html.parser')
    content = soup.find("table")
    for row in content.find_all('tr'):
        if row.find("th").get_text() == '考点所在地：' or row.find("th").get_text() == '传真：' or row.find("th").get_text() == '邮政编码：':
            continue
        text = row.find("td").get_text()
        detail.append("null") if text.strip() == '' or len(text) == 0 else detail.append(text) 
    print("已添加：" + str(detail))
    appendCsv(detail)

        
def initCsv() -> None:
    """ 初始化csv """
    head = ['机构全称', '机构简称', '详细地址', '联系人', '联系电话', '电子邮箱', '机构网站']
    with open('PmpInstitutions.csv', 'w', newline='') as f:
        write = csv.writer(f)
        write.writerow(head)

def appendCsv(text) -> None:
    """ 追加文件内容 """
    with open('PmpInstitutions.csv', 'a+', newline='') as f:
        write = csv.writer(f)
        write.writerow(text)

if __name__ == '__main__':
    initCsv()
    # 页码
    for page in range(1, 6):
        baseUrl = f'http://exam.chinapmp.cn/exampartners-101;page-{page}.shtml'
        # 获取第一层页面
        html = getHtml(baseUrl)
        # 解析链接
        links = parseHtmlToLinks(html)
        if len(links) > 0:
            # 跳转链接
            for link in links:
                html = getHtml(link['href'])
                parseHtmlToDetailInfo(html)
        time.sleep(1)
