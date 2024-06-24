const math = {
    calcNormls(posArr, indices){
        let posVecs = [];
        let normVecs = [];
        for(let i = 0; i < posArr.length; i += 3){
            posVecs.push(new Vec3(posArr[i], posArr[i+1], posArr[i+2]));
            normVecs.push(new Vec3(0,0,0));
        }

        for(let i = 0; i < indices.length; i += 3){
            let aVec = Vec3.sub(posVecs[indices[i+1]], posVecs[indices[i]]);
            let bVec = Vec3.sub(posVecs[indices[i+2]], posVecs[indices[i]]);
            let cVec = Vec3.cross(aVec, bVec);
            cVec.normalize();

            for(let j = i; j < i+3; ++j){
                normVecs[indices[j]] = Vec3.add(normVecs[indices[j]], cVec);
            }
        }

        for(let i = 0; i < normVecs.length; ++i){
            normVecs[i].normalize();
        }

        let res = [];
        for(let i = 0; i < normVecs.length; ++i){
            res.push(normVecs[i].x);
            res.push(normVecs[i].y);
            res.push(normVecs[i].z);
        }

        return res;
    },

    max(arr){
        let max = arr[0];
        for(let n of arr){ if(max < n) max = n;}
        return max;
    },
};

class Vec2{
    constructor(x, y){
        this.x = x;
        this.y = y;
    }

    normalize(){
        let size = Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
        this.x /= size;
        this.y /= size;
    }

    static add(aVec, bVec){
        return new Vec2(
            aVec.x + bVec.x,
            aVec.y + bVec.y
        );
    }

    static sub(aVec, bVec){
        return new Vec2(
            aVec.x - bVec.x,
            aVec.y - bVec.y
        );
    }
}

class Vec3{
    constructor(x, y, z){
        this.x = x;
        this.y = y;
        this.z = z;
    }

    extractToArr(){
        return [this.x, this.y, this.z];
    }

    normalize(){
        let size = Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2) + Math.pow(this.z, 2));
        this.x /= size;
        this.y /= size;
        this.z /= size;
    }

    static cross(aVec, bVec){
        let cVec = new Vec3(0,0,0);

        cVec.x = aVec.y * bVec.z - aVec.z * bVec.y;
        cVec.y = aVec.z * bVec.x - aVec.x * bVec.z;
        cVec.z = aVec.x * bVec.y - aVec.y * bVec.x;

        return cVec;
    }

    static add(aVec, bVec){
        return new Vec3(
            aVec.x + bVec.x,
            aVec.y + bVec.y,
            aVec.z + bVec.z
        );
    }

    static sub(aVec, bVec){
        return new Vec3(
            aVec.x - bVec.x,
            aVec.y - bVec.y,
            aVec.z - bVec.z
        );
    }

    static multiple(aVec, bVec){
        return new Vec3(
            aVec.x * bVec.x,
            aVec.y * bVec.y,
            aVec.z * bVec.z
        );
    }

    static repeat(scaler){
        return new Vec3(
            scaler,
            scaler,
            scaler
        );
    }

    static scalerMul(scaler, aVec){
        return Vec3.multiple(Vec3.repeat(scaler), aVec);
    }
}

class Vec4{
    constructor(x, y, z, w){
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;
    }
}

export {math, Vec2, Vec3, Vec4};