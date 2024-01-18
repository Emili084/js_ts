// Exercice 1
function categorize(values){
return values.reduce((acc, value) => {
    const type = typeof value;
    acc[type] = acc[type] || [];
    acc[type].push(value);
    return acc;
}, {});
}

const input = [1, 'hello', function sayHi(){ console.log('hi') }, 'world', true, 0n, 1000];
const output = categorize(input);

console.log(output);


// Exercice 2
if (!Array.prototype.dedup) {
    Array.prototype.dedup = function() {
        const uniqueArray = this.filter((value, index, self) => self.indexOf(value) === index);
        return uniqueArray;
    };
}

const arr = [1, 2, 2, 3, 4, 4, 5, 6, 6, 6];
console.log(arr.dedup());


// Exercice 3
const obj = {
    foo: 1,
    bar: 'hello',
    baz: true
    }

    function filterObject(obj, predicate) {
        const result = {};
        Object.keys(obj).forEach(key => {
            const value = obj[key];
            if (predicate(key, value)) {
                result[key] = value;
            }
        });
        return result;
    }

    const filtered = filterObject(obj, (key, value) => key === 'foo' || value === 'hello')
    console.log(filtered) // { foo: 1, bar: 'hello' }


// Exercice 4
// ne pas toucher
const asyncJob = (n) => Math.random() > 0.5 ? Promise.resolve(n + 1) :
Promise.reject(Error('boom'))
// a transformer
// asyncJob(0)
// .then(i => asyncJob(i))
// .then(i => Promise.all([
// asyncJob(i),
// asyncJob(i),
// asyncJob(i)
// ]))
// .then(([x, y, z]) => asyncJob(x + y + z))
// .catch(err => console.log(`gestion erreur globale: ${err.message}`))

(async () => {
    try {
      const i = await asyncJob(0);
      const results = await Promise.all([asyncJob(i), asyncJob(i), asyncJob(i)]);
      const [x, y, z] = results;
      const finalResult = await asyncJob(x + y + z);
    } catch (err) {
      console.log(`gestion erreur globale: ${err.message}`);
    }
  })();

// Exercice 5
function race(promises) {
    return new Promise((resolve, reject) => {
        promises.forEach(promise => {
            promise.then(resolve).catch(reject);
        });
    });
}


// Exercice 6
function all(promises){
    return new Promise((resolve, reject) => {
        const results = [];
        let pending = promises.length;
        promises.forEach((promise, index) => {
            promise.then(result => {
                results[index] = result;
                pending--;
                if (pending === 0) {
                    resolve(results);
                }
            }).catch(reject);
        });
    });
}
