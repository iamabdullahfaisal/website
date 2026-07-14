document.addEventListener('DOMContentLoaded', function () {
  var mount = document.getElementById('shopify-buy-button');
  if (!mount) return;

  var config = window.SHOPIFY_BUY_BUTTON_CONFIG || {};
  var storeDomain = config.storeDomain || '';
  var storefrontAccessToken = config.storefrontAccessToken || '';
  var productId = config.productId || '';
  var collectionId = config.collectionId || '';

  if (!storeDomain || !storefrontAccessToken || (!productId && !collectionId)) {
    mount.innerHTML =
      '<div class="content-card" style="text-align:center;max-width:720px;margin:0 auto">' +
      '<h3 style="margin-top:0">Shopify Buy Button setup needed</h3>' +
      '<p style="margin-bottom:0">Set <strong>SHOPIFY_BUY_BUTTON_CONFIG</strong> in this file with your store domain, storefront access token, and either a productId or collectionId.</p>' +
      '</div>';
    return;
  }

  function loadScript(src) {
    return new Promise(function (resolve, reject) {
      var script = document.createElement('script');
      script.src = src;
      script.async = true;
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }

  function renderFallback(message) {
    mount.innerHTML =
      '<div class="content-card" style="text-align:center;max-width:720px;margin:0 auto">' +
      '<h3 style="margin-top:0">Shopify Buy Button unavailable</h3>' +
      '<p style="margin-bottom:0">' + message + '</p>' +
      '</div>';
  }

  loadScript('https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js')
    .then(function () {
      if (!window.ShopifyBuy || !window.ShopifyBuy.UI) {
        renderFallback('The Shopify Buy Button SDK did not load correctly.');
        return;
      }

      var client = window.ShopifyBuy.buildClient({
        domain: storeDomain,
        storefrontAccessToken: storefrontAccessToken,
      });

      var ui = window.ShopifyBuy.UI.init(client);

      if (collectionId) {
        ui.createComponent('collection', {
          id: collectionId,
          node: mount,
          moneyFormat: '%7B%7Bamount%7D%7D',
          options: {
            product: {
              styles: {
                product: {
                  'text-align': 'center',
                  'border-radius': '24px',
                  'box-shadow': '0 18px 40px rgba(0,0,0,.18)'
                },
                button: {
                  'background-color': '#D4AF37',
                  ':hover': {
                    'background-color': '#c99f20'
                  },
                  'border-radius': '999px'
                }
              }
            },
            cart: {
              styles: {
                button: {
                  'background-color': '#D4AF37',
                  ':hover': {
                    'background-color': '#c99f20'
                  }
                }
              }
            }
          }
        });
        return;
      }

      ui.createComponent('product', {
        id: productId,
        node: mount,
        moneyFormat: '%7B%7Bamount%7D%7D',
        options: {
          product: {
            styles: {
              product: {
                'text-align': 'center',
                'border-radius': '24px',
                'box-shadow': '0 18px 40px rgba(0,0,0,.18)'
              },
              button: {
                'background-color': '#D4AF37',
                ':hover': {
                  'background-color': '#c99f20'
                },
                'border-radius': '999px'
              }
            }
          },
          cart: {
            styles: {
              button: {
                'background-color': '#D4AF37',
                ':hover': {
                  'background-color': '#c99f20'
                }
              }
            }
          }
        }
      });
    })
    .catch(function () {
      renderFallback('Unable to load the Shopify Buy Button SDK.');
    });
});
