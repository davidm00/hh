import requests
import json
from bs4 import BeautifulSoup
from requests_html import HTML
from requests_html import HTMLSession

def bs4_get_search_results(headers, params):
    html = requests.get('https://www.google.com/search', headers=headers, params=params).text
    soup = BeautifulSoup(html, 'lxml')

    data = []

    # DESKTOP RESULTS
    for result in soup.find_all('div', {'class':'ZINbbc luh4tb xpd O9g5cc uUPGi'}):
        title = result.find('h3').text
        if len(result.find('a').get('href').split("url=")) > 1:
            link = result.find('a').get('href').split("url=")[1]
        snippet = result.find('div', {'class':'BNeawe s3v9rd AP7Wnd'}).text

        data.append({
            'title': title,
            'link': link,
            'snippet': snippet,
        })
    return data

def bs4_get_similar_words(keyword, headers):
    words = [keyword]
    count = 0
    url = 'https://relatedwords.org/relatedto/' + keyword
    html = requests.get(url, headers).text
    soup = BeautifulSoup(html, 'lxml')
    res = soup.find('script', type='text/json')
    json_object = json.loads(res.contents[0])
    for word in json_object['terms']:
        if word['score'] > 0.35:
            words.append(word['word'])
            count +=1
        if count == 5:
            return words
    

if __name__ == '__main__':
    headers = {
        'User-agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.102 Safari/537.36 Edge/18.19582'
    }
    params = {
        'q': '', # search query
        'gl': 'us', # country to search from
        'hl': 'en', # language
    }
    # keywords = ['pollution', 'global warming', 'waste disposal', 'deforestation', 'biodiversity', 'public health']
    keywords = ['pollution']
    locations = {'south bend': 'south bend', 'notre dame': 'notre dame', 'mishiwaka': 'mishiwaka'}
    tags = {'charities': 'charities', 'news': 'news'}


    for keyword in keywords:
        words = bs4_get_similar_words(keyword, headers)
        for word in words:
            params['q'] = word + ' ' + locations['south bend'] +  ' ' + tags['charities']
            print(params['q'])
            data = bs4_get_search_results(headers, params)
            print(data)
            jstring = json.dumps(data)
    
    print(jstring)