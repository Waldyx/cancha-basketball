import requests

slugs = [
    'nike-lebron-22','ua-curry-12','nike-sabrina-2','anta-kai-1-speed','nike-kd-18',
    'jordan-luka-3','jordan-tatum-3','nike-kyrie-low-5','jordan-one-take-5',
    'nike-zoom-freak-4','nike-zoom-freak-5','nike-zoom-freak-6','puma-mb03','adidas-ae-1',
    'nb-two-wxy-v4','jordan-luka-2','nike-pg-6','nike-pg-7','nike-don-issue-6',
    'puma-scoot-zeros-3','nike-kyrie-infinity-2','ua-jet-23','nike-air-max-impact-5','li-ning-sonic-12',
    'nike-gt-run-2','nike-gt-jump-2','nike-kyrie-flytrap-6','ua-hovr-havoc-5','nike-air-zoom-crossover-2',
    'li-ning-yu-shi-18','converse-all-star-pro-bb','nb-kawhi-1','anta-shock-wave-5'
]

variants = [
    '-Cropped-650x406.jpg',
    '-Cropped.jpg',
    '.jpg'
]

for slug in slugs:
    found = False
    for suffix in variants:
        url = f'https://ballershoesdb.com/wp-content/uploads/{slug}{suffix}'
        try:
            r = requests.head(url, timeout=5)
            if r.status_code == 200:
                print(f"{slug}|{url}")
                found = True
                break
        except Exception:
            continue
    if not found:
        print(f"{slug}|SIN_IMAGEN")
