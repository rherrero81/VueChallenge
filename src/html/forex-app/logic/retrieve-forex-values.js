function retrieveForexValues(token, symbol) {
    StringValidator.prototype.validate(token);
    StringValidator.prototype.validate(symbol);

    return fetch(`${FOREX_API_URL}/values`, {
        headers: {
            'Content-type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        method: 'POST',
        body: JSON.stringify({
            symbol: symbol
        })
    }).then(res => {

        if (res.status == 400) return null;
        //  throw new BadRequest();
        return res.json()
    })

}