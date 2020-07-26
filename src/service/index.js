export const fetchPeople = async (url) => {
    const res = await fetch(url, {mode: 'cors'});

    if (!res.ok) {
        throw new Error(`Не могу получить данные по url ${url}. Ошибка: ${res.status}`)
    }
    const body = await res.json();

    return body
};








