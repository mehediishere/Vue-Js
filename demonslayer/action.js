new Vue({
    el: '#slayer',
    data: {
        version: 'Version : 1.0',
        gameRunning: false,
        playerHealth: 100,
        monsterHealth: 100,
        audioFx : '',
        turns : [],
        sp: false,
        attackDisable : false,
        monsterImg : 'https://i.pinimg.com/originals/02/9f/84/029f84411469efd1f281178772c9285d.gif',
        playerImg : 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/25c93289-0576-4645-bc48-e828abec9740/ddghjn9-d7362794-7f82-47cc-b350-d72f548ed287.gif?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3sicGF0aCI6IlwvZlwvMjVjOTMyODktMDU3Ni00NjQ1LWJjNDgtZTgyOGFiZWM5NzQwXC9kZGdoam45LWQ3MzYyNzk0LTdmODItNDdjYy1iMzUwLWQ3MmY1NDhlZDI4Ny5naWYifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6ZmlsZS5kb3dubG9hZCJdfQ.hv26s-HG9ihKu-ENsJJ-dvrBRImVZXiEZ9XbXc2ucOc'
    },
    methods: {
        startGame: function(){
            this.gameRunning = true;
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.turns = [];
        },
        attack: function(){
          this.audioFx = 'audio/slash.mp3';
          var v = this;
          setTimeout(function(){
            v.fighting(2, 8, 4, 10);
          }, 600);
        },
        specialAttack: function(){
            this.attackDisable = true;
            this.playerImg = 'https://static.wikia.nocookie.net/kimetsu-no-yaiba/images/1/16/Inosuke_using_Fang_Three_Devour_on_Horned_Demon.gif';
            this.sp = true;
            this.audioFx = "audio/Inosuke.mp3";
            var v = this;
            setTimeout(function(){
              v.sp = false;
              v.playerImg = 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/25c93289-0576-4645-bc48-e828abec9740/ddghjn9-d7362794-7f82-47cc-b350-d72f548ed287.gif?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3sicGF0aCI6IlwvZlwvMjVjOTMyODktMDU3Ni00NjQ1LWJjNDgtZTgyOGFiZWM5NzQwXC9kZGdoam45LWQ3MzYyNzk0LTdmODItNDdjYy1iMzUwLWQ3MmY1NDhlZDI4Ny5naWYifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6ZmlsZS5kb3dubG9hZCJdfQ.hv26s-HG9ihKu-ENsJJ-dvrBRImVZXiEZ9XbXc2ucOc';
              v.fighting(12,16,4,10);
              v.attackDisable = false;
            }, 5000);
        },
        heal: function(){
            this.playerImg = 'img/slayer3.gif';
            this.attackDisable = true;
            this.audioFx = 'audio/heal.mp3';
            var v = this;
            setTimeout(function(){
              v.attackDisable = false;
              v.playerImg = 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/25c93289-0576-4645-bc48-e828abec9740/ddghjn9-d7362794-7f82-47cc-b350-d72f548ed287.gif?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3sicGF0aCI6IlwvZlwvMjVjOTMyODktMDU3Ni00NjQ1LWJjNDgtZTgyOGFiZWM5NzQwXC9kZGdoam45LWQ3MzYyNzk0LTdmODItNDdjYy1iMzUwLWQ3MmY1NDhlZDI4Ny5naWYifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6ZmlsZS5kb3dubG9hZCJdfQ.hv26s-HG9ihKu-ENsJJ-dvrBRImVZXiEZ9XbXc2ucOc';
              v.fighting(0,0,4,10);
              if(v.playerHealth <=90){
                v.playerHealth += 10;
              }else{
                v.playerHealth = 100;
              }
            }, 3000);
        },
        run: function(){
            // this.gameRunning = false;
            // this.startGame();
            // this.turns = [];
            this.attackDisable = true;
        },
        fighting : function(m_min, m_max, p_min, p_max){
            var damage = Math.max(Math.floor(Math.random()*m_max), m_min);
            this.monsterHealth -= damage;
            // console.log(damage);
            if(damage <= 0){
              var logHistory = 'Inosuke used Heal';
            }else if(damage >=12){
              var logHistory = 'Inosuke deal     '+ damage + ' HP SPECIAL damage';
            }else{
              var logHistory = 'Inosuke deal     '+ damage + ' HP damage';
            }
            this.playerFightingHistory(logHistory);

            this.checkHealth();

            // ---------------------------

            var damage = Math.max(Math.floor(Math.random()*p_max), p_min);
            this.playerHealth -= damage;

            var logHistory = 'Monster deal     '+ damage + ' HP damage';
            this.monsterFightingHistory(logHistory);

            this.checkHealth();
            this.audioFx = '';
        },
        checkHealth: function(){
            if(this.monsterHealth <= 0){
                this.monsterHealth = 0;
                this.gameRunning = false;
                Swal.fire({
                    title: 'You Won. Start Again?!',
                    text: "Lets keep Shining",
                    icon: 'info',
                    showCancelButton: true,
                    confirmButtonText: 'Yes, Lets go!',
                    cancelButtonText: 'No, Lets take a break!',
                    reverseButtons: true
                  }).then((result) => {
                    if (result.isConfirmed) {
                        Swal.fire(
                        'Safe to Start!',
                        'Time to Shine',
                        'success',
                        this.startGame()
                      )
                    } else if (
                      /* Read more about handling dismissals below */
                      result.dismiss === Swal.DismissReason.cancel
                    ) {
                        Swal.fire(
                        'That was exciting',
                        'Still a long journey to go though',
                        '',
                        this.gameRunning = false
                      )
                    }
                  })
                return;
            }
            else if(this.playerHealth <= 0){
                this.playerHealth = 0;
                this.gameRunning = false;
                Swal.fire({
                    title: 'You Lost. Start Again?!',
                    text: "Never too late to try again",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Yes, Lets go!',
                    cancelButtonText: 'No, Send me home!',
                    reverseButtons: true
                  }).then((result) => {
                    if (result.isConfirmed) {
                        Swal.fire(
                        'Safe to Start!',
                        'Time to Shine',
                        'success',
                        this.startGame()
                      )
                    } else if (
                      /* Read more about handling dismissals below */
                      result.dismiss === Swal.DismissReason.cancel
                    ) {
                        Swal.fire(
                        'Brutal Defeat',
                        'Still a long journey to go',
                        'error',
                        this.gameRunning = false
                      )
                    }
                  })
            }

        },
        playerFightingHistory: function(battleLog){
          this.turns.unshift({
            isPlayer: true,
            text: battleLog
          });
        },
        monsterFightingHistory: function(battleLog){
          this.turns.unshift({
            isPlayer: false,
            text: battleLog
          });
        }
    }
})