import moment from "moment"

export const getPostedDateDice = (text) => {
  const match = text.match(/Posted\s+([^|]+)/);
  if (match) {
    const daysAgo = parseInt(match[1], 10);
    const postedDate = new Date();
    postedDate.setDate(postedDate.getDate() - daysAgo);
    return postedDate.toISOString().split('T')[0]; // Returns date in 'YYYY-MM-DD' format
  }
  return null;
}

export const getPostedDate = {
  'www.dice.com': getPostedDateDice
}

export const isEmpty = (value: any): boolean  => {
  if (value === null || value === undefined) return true;

  if (typeof value === 'string' && value.trim() === '') return true;

  if (Array.isArray(value) && value.length === 0) return true;

  if (typeof value === 'object' && !Array.isArray(value)) {
    return Object.keys(value).length === 0;
  }

  if (typeof value === 'number' && isNaN(value)) return true;

  return false;
}

export const fetchJobDetail = (request) => {
  const fields = ["title", "company", "location", "postedDate", "description"]
  const host = window.location.host;
  const data = {
    url: window.location.href
  }
  for(let field of fields) {
    if (!isEmpty(request.body[field]))
    if (request.body[field] == "-") {
      if (field == 'postedDate') {
        data[field] = moment().format("YYYY-MM-DD")
      } else {
        data[field] = ""
      }
    } else {
      if (field == "postedDate") {
        data[field] = getPostedDate[host](document.querySelector(request.body[field])?.textContent)
      } else {
        data[field] = document.querySelector(request.body[field])?.textContent ?? ""
      }
    }
  }

  return data
}