class CustomMap<K, V> extends Map<K, V> {
    contains = (key: K) => {
        let allKeys: any[] = [...this.keys()];
        if (allKeys.length <= 0) return this.has(key);
        if (Object.getOwnPropertyNames(key).indexOf("equals") >= 0 && Object.getOwnPropertyNames(allKeys[0]).indexOf("equals") >= 0) {
            for (let i = 0; i < allKeys.length; i++) {
                let k = allKeys[i];
                if (Object.getOwnPropertyNames(k).indexOf("equals") >= 0) {
                    if (k.equals(key)) {
                        return true;
                    }
                }
            }
            return false;
        }
        return this.has(key);
    }
    getFromKey = (key: K) => {
        let allKeys: any[] = [...this.keys()];
        if (allKeys.length <= 0) return this.get(key);
        if (Object.getOwnPropertyNames(key).indexOf("equals") >= 0 && Object.getOwnPropertyNames(allKeys[0]).indexOf("equals") >= 0) {
            for (let i = 0; i < allKeys.length; i++) {
                let k = allKeys[i];
                if (Object.getOwnPropertyNames(k).indexOf("equals") >= 0) {
                    if (k.equals(key)) {
                        return this.get(k);
                    }
                }
            }
            return false;
        }
        return this.get(key);
    }
}

export default CustomMap;