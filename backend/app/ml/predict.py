import joblib
import os
import tldextract
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# Load model dan feature_names 
try:
    model         = joblib.load(os.path.join(BASE_DIR, 'phishguard_model.pkl'))
    feature_names = joblib.load(os.path.join(BASE_DIR, 'feature_names.pkl'))
    print("Model ML berhasil dimuat")
except Exception as e:
    model         = None
    feature_names = []
    print(f" Model tidak ditemukan, pakai scoring manual: {e}")


def extract_fitur(url: str) -> dict:
    url = str(url)

    try:
        ext       = tldextract.extract(url)
        domain    = ext.domain
        suffix    = ext.suffix
        subdomain = ext.subdomain
    except:
        domain = suffix = subdomain = ''

    subdomain_count = len(subdomain.split('.')) if subdomain else 0

    phishing_words = [
        'login', 'verify', 'verifikasi', 'secure', 'security',
        'account', 'akun', 'update', 'confirm', 'bank',
        'password', 'signin', 'wallet', 'transfer'
    ]
    word_count = sum(1 for w in phishing_words if w in url.lower())

    bad_tlds = ['xyz', 'tk', 'ml', 'ga', 'cf', 'gq', 'top', 'click', 'link']

    return {
        'url_length':         len(url),
        'domain_length':      len(domain),
        'subdomain_count':    subdomain_count,
        'path_length':        len(url.split('/', 3)[-1]) if '/' in url else 0,
        'has_https':          int(url.startswith('https://')),
        'has_at':             int('@' in url),
        'has_double_slash':   int('//' in url[8:]),
        'has_dash':           int('-' in domain),
        'has_ip':             int(any(p.isdigit() for p in url.split('.'))),
        'dot_count':          url.count('.'),
        'digit_count':        sum(c.isdigit() for c in url),
        'special_char_count': sum(c in ['@','%','=','?','&','-','_'] for c in url),
        'suspicious_tld':     int(suffix in bad_tlds),
        'suspicious_words':   word_count,
        'is_shortened':       int(domain in ['bit', 'tinyurl', 'goo', 't', 'ow']),
    }


def predict_url(url: str) -> float:
    # Ekstrak fitur dari URL
    features = extract_fitur(url)

    if model is not None:
        feature_vector = [features.get(name, 0) for name in feature_names]

        # predict_proba mengembalikan [prob_legitimate, prob_phishing]
        # ambil index [1] yaitu probabilitas phishing
        prob_phishing = model.predict_proba([feature_vector])[0][1]
        return round(prob_phishing * 100)

    else:
        score = 0
        if not features['has_https']:       score += 20
        if features['suspicious_tld']:      score += 30
        if features['has_at']:              score += 25
        if features['has_dash']:            score += 10
        if features['url_length'] > 75:     score += 15
        score += features['suspicious_words'] * 15
        return min(score, 100)