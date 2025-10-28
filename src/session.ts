import { HttpCodeError } from "./exceptions";
import { APICreditEntity } from "./types";

export class Session {
    private readonly _base_url: string;
    private readonly _apikey: string;

    constructor(apiKey: string, baseUrl: string = "https://api.fish.audio") {
        this._apikey = apiKey;
        this._base_url = baseUrl.replace(/\/$/, "");
    }

    private authHeaders(): Headers {
        const headers = new Headers({ Authorization: `Bearer ${this._apikey}` });
        return headers;
    }

    private async tryRaise(resp: Response): Promise<void> {
        if (resp.ok) return;
        let message = resp.statusText;
        try {
            const ct = resp.headers.get("content-type") || "";
            if (ct.includes("application/json")) {
                const data = await resp.json();
                message = data?.detail ?? data?.message ?? message;
            } else {
                const text = await resp.text();
                if (text) message = text;
            }
        } catch {}
        throw new HttpCodeError(resp.status, message);
    }

    public async getApiCredit(user_id: string = "self"): Promise<APICreditEntity> {
        const resp = await fetch(`${this._base_url}/wallet/${user_id}/api-credit`, {
            headers: this.authHeaders(),
        });
        await this.tryRaise(resp);
        const data = await resp.json() as APICreditEntity;
        return data;
    }
}
