Vue.use(Buefy.default);



var app = new Vue({
    el: '#app',
    data: {
      activeTab: 0,
      sceneTab:0,
      user: {
        usuario: null,
        contrasena: null,
        adidas: 0,
        reebok: 0
      },
      loadingComponent : null
    },
    methods: {
      login : function(){
        app.loadingComponent = this.$loading.open();
        if(app.user.usuario == null || app.user.contrasena == null){
          this.$dialog.alert('Ingresa los datos de acceso');
          return false;
        }
        var credentials = {"type":"seller", "key": "usuario", "value":app.user.usuario };
        fetch('https://dragonbarbudo.com/api/grabasa/r/', {
          method: "POST",
          body: JSON.stringify(credentials)
        })
        .then(function(u){ return u.json(); })
        .then(function(json){
          app.loadingComponent.close();
          if(json!=null){
            if(json['contrasena']==app.user.contrasena){
              app.activeTab=3;
              app.user = json;
            } else {
              app.$dialog.alert('Error en los datos de acceso');
            }
          } else {
            app.$dialog.alert('Error en los datos de acceso');
          }
          
        });


        
      }
    },

})
