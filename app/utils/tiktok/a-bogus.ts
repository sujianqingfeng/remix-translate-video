// All the content in this article is only for learning and communication use, not for any other purpose, strictly prohibited for commercial use and illegal use, otherwise all the consequences are irrelevant to the author!

interface SObj {
    s0: string;
    s1: string;
    s2: string;
    s3: string;
    s4: string;
    [key: string]: string;
}

interface Constant {
    "0": number;
    "1": number;
    "2": number;
    str: string;
}

interface BObject {
    [key: number]: any;
    15: {
        aid: number;
        pageId: number;
        boe: boolean;
        ddrt: number;
        paths: {
            include: Array<Record<string, never>>;
            exclude: Array<any>;
        };
        track: {
            mode: number;
            delay: number;
            paths: Array<any>;
        };
        dump: boolean;
        rpU: string;
    };
    19: number[];
}

class SM3 {
    private reg: number[];
    private chunk: number[];
    private size: number;

    constructor() {
        this.reg = [];
        this.chunk = [];
        this.size = 0;
        this.reset();
    }

    private reset(): void {
        this.reg[0] = 1937774191;
        this.reg[1] = 1226093241;
        this.reg[2] = 388252375;
        this.reg[3] = 3666478592;
        this.reg[4] = 2842636476;
        this.reg[5] = 372324522;
        this.reg[6] = 3817729613;
        this.reg[7] = 2969243214;
        this.chunk = [];
        this.size = 0;
    }

    private write(e: string | number[]): void {
        const a: number[] = typeof e === "string" ? 
            (() => {
                const n = encodeURIComponent(e).replace(/%([0-9A-F]{2})/g, 
                    (_, r) => String.fromCharCode(parseInt("0x" + r, 16))
                );
                const a = new Array(n.length);
                Array.prototype.forEach.call(n, (e: string, r: number) => {
                    a[r] = e.charCodeAt(0);
                });
                return a;
            })() : e;

        this.size += a.length;
        let f = 64 - this.chunk.length;
        
        if (a.length < f) {
            this.chunk = this.chunk.concat(a);
        } else {
            this.chunk = this.chunk.concat(a.slice(0, f));
            while (this.chunk.length >= 64) {
                this._compress(this.chunk);
                f < a.length ? 
                    this.chunk = a.slice(f, Math.min(f + 64, a.length)) : 
                    this.chunk = [];
                f += 64;
            }
        }
    }

    private _compress(t: number[]): void {
        if (t.length < 64) {
            console.error("compress error: not enough data");
            return;
        }

        const f = (() => {
            const r = new Array(132);
            for (let t = 0; t < 16; t++) {
                r[t] = t[4 * t] << 24;
                r[t] |= t[4 * t + 1] << 16;
                r[t] |= t[4 * t + 2] << 8;
                r[t] |= t[4 * t + 3];
                r[t] >>>= 0;
            }
            for (let n = 16; n < 68; n++) {
                let a = r[n - 16] ^ r[n - 9] ^ le(r[n - 3], 15);
                a = a ^ le(a, 15) ^ le(a, 23);
                r[n] = (a ^ le(r[n - 13], 7) ^ r[n - 6]) >>> 0;
            }
            for (let n = 0; n < 64; n++) {
                r[n + 68] = (r[n] ^ r[n + 4]) >>> 0;
            }
            return r;
        })();

        const i = this.reg.slice(0);
        for (let c = 0; c < 64; c++) {
            let o = le(i[0], 12) + i[4] + le(de(c), c);
            const s = ((o = le(o = (4294967295 & o) >>> 0, 7)) ^ le(i[0], 12)) >>> 0;
            let u = pe(c, i[0], i[1], i[2]);
            u = (4294967295 & (u = u + i[3] + s + f[c + 68])) >>> 0;
            let b = he(c, i[4], i[5], i[6]);
            b = (4294967295 & (b = b + i[7] + o + f[c])) >>> 0;
            i[3] = i[2];
            i[2] = le(i[1], 9);
            i[1] = i[0];
            i[0] = u;
            i[7] = i[6];
            i[6] = le(i[5], 19);
            i[5] = i[4];
            i[4] = (b ^ le(b, 9) ^ le(b, 17)) >>> 0;
        }
        for (let l = 0; l < 8; l++) {
            this.reg[l] = (this.reg[l] ^ i[l]) >>> 0;
        }
    }

    private _fill(): void {
        const a = 8 * this.size;
        let f = this.chunk.push(128) % 64;
        if (64 - f < 8) f -= 64;
        
        while (f < 56) {
            this.chunk.push(0);
            f++;
        }
        
        for (let i = 0; i < 4; i++) {
            const c = Math.floor(a / 4294967296);
            this.chunk.push(c >>> (8 * (3 - i)) & 255);
        }
        for (let i = 0; i < 4; i++) {
            this.chunk.push(a >>> (8 * (3 - i)) & 255);
        }
    }

    public sum(e?: string | number[], t?: 'hex'): string | number[] {
        if (e) {
            this.reset();
            this.write(e);
        }
        this._fill();
        
        for (let f = 0; f < this.chunk.length; f += 64) {
            this._compress(this.chunk.slice(f, f + 64));
        }
        
        let i: string | number[] = [];
        if (t === 'hex') {
            i = "";
            for (let f = 0; f < 8; f++) {
                i += se(this.reg[f].toString(16), 8, "0");
            }
        } else {
            i = new Array(32);
            for (let f = 0; f < 8; f++) {
                let c = this.reg[f];
                i[4 * f + 3] = (255 & c) >>> 0;
                c >>>= 8;
                i[4 * f + 2] = (255 & c) >>> 0;
                c >>>= 8;
                i[4 * f + 1] = (255 & c) >>> 0;
                c >>>= 8;
                i[4 * f] = (255 & c) >>> 0;
            }
        }
        this.reset();
        return i;
    }
}

function rc4_encrypt(plaintext: string, key: string): string {
    const s: number[] = [];
    for (let i = 0; i < 256; i++) {
        s[i] = i;
    }
    
    let j = 0;
    for (let i = 0; i < 256; i++) {
        j = (j + s[i] + key.charCodeAt(i % key.length)) % 256;
        const temp = s[i];
        s[i] = s[j];
        s[j] = temp;
    }

    let i = 0;
    j = 0;
    const cipher: string[] = [];
    for (let k = 0; k < plaintext.length; k++) {
        i = (i + 1) % 256;
        j = (j + s[i]) % 256;
        const temp = s[i];
        s[i] = s[j];
        s[j] = temp;
        const t = (s[i] + s[j]) % 256;
        cipher.push(String.fromCharCode(s[t] ^ plaintext.charCodeAt(k)));
    }
    return cipher.join('');
}

function le(e: number, r: number): number {
    return (e << (r %= 32) | e >>> (32 - r)) >>> 0;
}

function de(e: number): number {
    return e >= 0 && e < 16 ? 2043430169 : 
           e >= 16 && e < 64 ? 2055708042 : 
           (() => { console.error("invalid j for constant Tj"); return 0; })();
}

function pe(e: number, r: number, t: number, n: number): number {
    return e >= 0 && e < 16 ? (r ^ t ^ n) >>> 0 :
           e >= 16 && e < 64 ? (r & t | r & n | t & n) >>> 0 :
           (() => { console.error('invalid j for bool function FF'); return 0; })();
}

function he(e: number, r: number, t: number, n: number): number {
    return e >= 0 && e < 16 ? (r ^ t ^ n) >>> 0 :
           e >= 16 && e < 64 ? (r & t | ~r & n) >>> 0 :
           (() => { console.error('invalid j for bool function GG'); return 0; })();
}

function result_encrypt(long_str: string, num: string | null = null): string {
    const s_obj: SObj = {
        "s0": "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
        "s1": "Dkdpgh4ZKsQB80/Mfvw36XI1R25+WUAlEi7NLboqYTOPuzmFjJnryx9HVGcaStCe=",
        "s2": "Dkdpgh4ZKsQB80/Mfvw36XI1R25-WUAlEi7NLboqYTOPuzmFjJnryx9HVGcaStCe=",
        "s3": "ckdp1h4ZKsUB80/Mfvw36XIgR25+WQAlEi7NLboqYTOPuzmFjJnryx9HVGDaStCe",
        "s4": "Dkdpgh2ZmsQB80/MfvV36XI1R45-WUAlEixNLwoqYTOPuzKFjJnry79HbGcaStCe"
    };
    
    const constant: Constant = {
        "0": 16515072,
        "1": 258048,
        "2": 4032,
        "str": s_obj[num || 's0'],
    };

    let result = "";
    let lound = 0;
    let long_int = get_long_int(lound, long_str);
    let temp_int: number;
    
    for (let i = 0; i < (long_str.length / 3 * 4); i++) {
        if (Math.floor(i / 4) !== lound) {
            lound += 1;
            long_int = get_long_int(lound, long_str);
        }
        const key = i % 4;
        switch (key) {
            case 0:
                temp_int = (long_int & constant["0"]) >> 18;
                result += constant.str.charAt(temp_int);
                break;
            case 1:
                temp_int = (long_int & constant["1"]) >> 12;
                result += constant.str.charAt(temp_int);
                break;
            case 2:
                temp_int = (long_int & constant["2"]) >> 6;
                result += constant.str.charAt(temp_int);
                break;
            case 3:
                temp_int = long_int & 63;
                result += constant.str.charAt(temp_int);
                break;
        }
    }
    return result;
}

function get_long_int(round: number, long_str: string): number {
    round = round * 3;
    return (long_str.charCodeAt(round) << 16) | 
           (long_str.charCodeAt(round + 1) << 8) | 
           long_str.charCodeAt(round + 2);
}

function gener_random(random: number, option: number[]): number[] {
    return [
        (random & 255 & 170) | option[0] & 85,
        (random & 255 & 85) | option[0] & 170,
        (random >> 8 & 255 & 170) | option[1] & 85,
        (random >> 8 & 255 & 85) | option[1] & 170,
    ];
}

function generate_rc4_bb_str(
    url_search_params: string,
    user_agent: string,
    window_env_str: string,
    suffix: string = "cus",
    Arguments: number[] = [0, 1, 14]
): string {
    const sm3 = new SM3();
    const start_time = Date.now();
    
    const url_search_params_list = sm3.sum(sm3.sum(url_search_params + suffix)) as number[];
    const cus = sm3.sum(sm3.sum(suffix)) as number[];
    const ua = sm3.sum(
        result_encrypt(
            rc4_encrypt(
                user_agent,
                String.fromCharCode.apply(null, [0.00390625, 1, 14])
            ),
            "s3"
        )
    ) as number[];
    
    const end_time = Date.now();
    
    const b: BObject = {
        8: 3,
        10: end_time,
        15: {
            "aid": 6383,
            "pageId": 6241,
            "boe": false,
            "ddrt": 7,
            "paths": {
                "include": [{}, {}, {}, {}, {}, {}, {}],
                "exclude": []
            },
            "track": {
                "mode": 0,
                "delay": 300,
                "paths": []
            },
            "dump": true,
            "rpU": ""
        },
        16: start_time,
        18: 44,
        19: [1, 0, 1, 5]
    };

    // Time calculations
    b[20] = (b[16] >> 24) & 255;
    b[21] = (b[16] >> 16) & 255;
    b[22] = (b[16] >> 8) & 255;
    b[23] = b[16] & 255;
    b[24] = (b[16] / 256 / 256 / 256 / 256) >> 0;
    b[25] = (b[16] / 256 / 256 / 256 / 256 / 256) >> 0;

    // Arguments calculations
    b[26] = (Arguments[0] >> 24) & 255;
    b[27] = (Arguments[0] >> 16) & 255;
    b[28] = (Arguments[0] >> 8) & 255;
    b[29] = Arguments[0] & 255;

    b[30] = (Arguments[1] / 256) & 255;
    b[31] = (Arguments[1] % 256) & 255;
    b[32] = (Arguments[1] >> 24) & 255;
    b[33] = (Arguments[1] >> 16) & 255;

    b[34] = (Arguments[2] >> 24) & 255;
    b[35] = (Arguments[2] >> 16) & 255;
    b[36] = (Arguments[2] >> 8) & 255;
    b[37] = Arguments[2] & 255;

    // URL params calculations
    b[38] = url_search_params_list[21];
    b[39] = url_search_params_list[22];

    // CUS calculations
    b[40] = cus[21];
    b[41] = cus[22];

    // UA calculations
    b[42] = ua[23];
    b[43] = ua[24];

    // End time calculations
    b[44] = (b[10] >> 24) & 255;
    b[45] = (b[10] >> 16) & 255;
    b[46] = (b[10] >> 8) & 255;
    b[47] = b[10] & 255;
    b[48] = b[8];
    b[49] = (b[10] / 256 / 256 / 256 / 256) >> 0;
    b[50] = (b[10] / 256 / 256 / 256 / 256 / 256) >> 0;

    // PageId and aid calculations
    b[51] = b[15].pageId;
    b[52] = (b[15].pageId >> 24) & 255;
    b[53] = (b[15].pageId >> 16) & 255;
    b[54] = (b[15].pageId >> 8) & 255;
    b[55] = b[15].pageId & 255;

    b[56] = b[15].aid;
    b[57] = b[15].aid & 255;
    b[58] = (b[15].aid >> 8) & 255;
    b[59] = (b[15].aid >> 16) & 255;
    b[60] = (b[15].aid >> 24) & 255;

    // Environment list calculations
    const window_env_list: number[] = Array.from(window_env_str).map(char => char.charCodeAt(0));
    b[64] = window_env_list.length;
    b[65] = b[64] & 255;
    b[66] = (b[64] >> 8) & 255;

    b[69] = 0;
    b[70] = b[69] & 255;
    b[71] = (b[69] >> 8) & 255;

    // Final XOR calculation
    b[72] = b[18] ^ b[20] ^ b[26] ^ b[30] ^ b[38] ^ b[40] ^ b[42] ^ b[21] ^ b[27] ^ b[31] ^ b[35] ^ b[39] ^ b[41] ^ b[43] ^ b[22] ^
            b[28] ^ b[32] ^ b[36] ^ b[23] ^ b[29] ^ b[33] ^ b[37] ^ b[44] ^ b[45] ^ b[46] ^ b[47] ^ b[48] ^ b[49] ^ b[50] ^ b[24] ^
            b[25] ^ b[52] ^ b[53] ^ b[54] ^ b[55] ^ b[57] ^ b[58] ^ b[59] ^ b[60] ^ b[65] ^ b[66] ^ b[70] ^ b[71];

    const bb = [
        b[18], b[20], b[52], b[26], b[30], b[34], b[58], b[38], b[40], b[53], b[42], b[21], b[27], b[54], b[55], b[31],
        b[35], b[57], b[39], b[41], b[43], b[22], b[28], b[32], b[60], b[36], b[23], b[29], b[33], b[37], b[44], b[45],
        b[59], b[46], b[47], b[48], b[49], b[50], b[24], b[25], b[65], b[66], b[70], b[71]
    ].concat(window_env_list).concat(b[72]);

    return rc4_encrypt(
        String.fromCharCode.apply(null, bb),
        String.fromCharCode.apply(null, [121])
    );
}

function se(str: string | number, len: number, pad: string): string {
    str = str.toString();
    while (str.length < len) {
        str = pad + str;
    }
    return str;
}

export {
    SM3,
    rc4_encrypt,
    result_encrypt,
    get_long_int,
    gener_random,
    generate_rc4_bb_str,
    se
}; 