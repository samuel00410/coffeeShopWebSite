const n=r=>`$${parseInt(r,10).toLocaleString()}`,a=r=>{const t=new Date(r*1e3);return`${t.getFullYear()}/${t.getMonth()+1}/${t.getDate()}`},o=r=>{const t=Object.values(r);return t.length>0?t.map(e=>`${e.product_id} 數量 : ${e.qty} `).join(`
`):"無商品"};export{o as a,n as c,a as f};
