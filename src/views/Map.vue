<template>
<div class="container is-fullhd" style="height:100%;">
     <nav class="navbar" role="navigation" aria-label="main navigation">
      <div class="navbar-menu">
        <div class="navbar-start">
          <div class="navbar-item">
            <a class="button is-text is-myBack" @click="$router.push({name: 'select', params:{group:group, name:name}})"><span class="icon"><i class="fas fa-chevron-left"></i></span></a>
         <div class="navbar-brand">
        <a class="navbar-item">
          <!-- <img src="@/assets/RUSHlogo.png" alt="logo" class="logo"> -->
            <h5 class="subtitle is-4 has-text-dark">{{name}}</h5>
        </a>
      </div>
          </div>
        </div>
      </div>
    </nav>
    <br><br>
<div class="columns">
    <!-- <img src="http://localhost:8000/stores/mapimage/sample/sample"> -->
    <div style="overflow-y: scroll; height:1200px;">
    <div id="drawing"></div>
    </div>
    </div>
</div>    
</template>

<script>
export default {
    data () {
        return {
            group: '',
            name: '',
            items_string: '',
            items: [],

            points: {}

        }
    },
    mounted () {

        // var map_image = image('http://localhost:8000/stores/mapimage/sample/sample')
        // console.log(map_image.width)
        // console.log(map_image.height)

        var draw = SVG('drawing').size(1000, 1000)

        var group = this.group
        var name = this.name
        // draw.rect(500, 500).move(100, 100).fill('#f06')

        // var image = draw.image('http://localhost:8000/stores/mapimage/sample/sample')
        // console.log(image.width())
        // console.log(image.height())
        // console.log(image)

        // var image_url = 'http://localhost:8000/stores/mapimage/${this.group}/${this.name}'
        var image = draw.image('http://localhost:8000/stores/mapimage/'+group+'/'+name).loaded(function(loader) {
            this.size(loader.width, loader.height)
            // console.log(this.width())
            // console.log(this.height())
        })

        this.$http.get('http://localhost:8000/stores/mappoint/'+group+'/'+name)
        .then(response => {
            console.log(response.data)
            // draw point
            var data = response.data
            this.points = data

            this.$http.get('http://localhost:8000/stores/'+group+'/'+name+'/route/'+this.items_string)
            .then(response => {
                // console.log(response.data)

                var path = response.data.path

                var path_point = []
                var select_path_point = []
                // var current = path[0]
                // for (var i = 1; i < path.length; i++) {
                    //     console.log(path[i])
                //     console.log(this.points)
                //     var pre_x = this.points[current][0]
                //     var pre_y = this.points[current][1]

                //     var cur_x = this.points[path[i]][0]
                //     var cur_y = this.points[path[i]][1]

                //     var line = draw.line(pre_x, pre_y, cur_x, cur_y).stroke({ width: 1 })

                //     current = path[i]
                // }
                for (var i = 0; i < path.length; i++) {
                    path_point.push([this.points[path[i]][0], this.points[path[i]][1]])
                }
                // console.log(path_point)

                var keys = this.items_string.split(';')
                this.$http.get('http://localhost:8000/stores/'+group+'/'+name)
                .then(response => {
                    console.log('AAAAAAA')
                    console.log(response.data)
                    var names = response.data
                    
                    for (var key in data) {
                        // console.log(data[key])
        
                        if (key in names) {
                            
                            var x = data[key][0]
                            var y = data[key][1]
                            draw.circle(10).attr({fill: '#000', 'fill-opacity': 0.15}).move(x-5, y-5)
                        }
                    }

                    var polyline = draw.polyline(path_point)
                    polyline.fill('none')
                    polyline.stroke({ color: '#f06', width: 4, linecap: 'round', linejoin: 'round', 'opacity':0.6 })
                    
                    for (var i = 0; i < keys.length; i++) {
                        // select_path_point.push([this.points[keys[i]][0], this.points[keys[i]][1]])
                        var x = this.points[keys[i]][0]
                        var y = this.points[keys[i]][1]
                        draw.circle(20).attr({fill: '#f06', 'fill-opacity': 1}).center(x, y)
                    }
                    // polyline.animate(3000).plot(path_point)

                    draw.circle(25).attr({fill: '#4b7', 'fill-opacity': 1}).center(this.points['START'][0], this.points['START'][1])
                    draw.circle(25).attr({fill: '#4b7', 'fill-opacity': 1}).center(this.points['END'][0], this.points['END'][1])

                    var path_string = 'm '+path_point[0][0] + ',' + path_point[0][1] + ' '
                    for (var i = 1; i < path_point.length; i++) {
                        path_string += (path_point[i][0] - path_point[i-1][0]) + ',' + (path_point[i][1] - path_point[i-1][1]) + ' '
                    }

                    console.log(path_string)

                    var ppp = draw.path(path_string)
                    // ppp.stroke({ color: '#f06', width: 4, linecap: 'round', linejoin: 'round' })
                    ppp.fill('none')
                    var length = ppp.length()

                    var current = draw.circle(20).move(path_point[0][0]-10, path_point[0][1]-10)
                    current.attr({fill: '#17f'})
                    // current.animate(300).move(path_point[1][0]-10, path_point[1][1]-10).loop()
                    // // current.finish()
                    // current.animate(600).move(path_point[2][0]-10, path_point[2][1]-10).loop()

                    // // rect.animate(3000).move(100, 100).after(function(situation) {
                    // //     this.animate().attr({ fill: '#f06' })
                    // // })

                    current.animate(length*5, '<>').during(function(pos, morph, eased){
                        var p = ppp.pointAt(eased * length)
                        current.center(p.x, p.y)
                    }).loop()


                    for (var i = 0; i < keys.length; i++) {
                        // select_path_point.push([this.points[keys[i]][0], this.points[keys[i]][1]])
                        var x = this.points[keys[i]][0]
                        var y = this.points[keys[i]][1]
                        var text = draw.text(names[keys[i]]).move(x, y-10)
                        text.stroke({ color: '#fff', opacity: 0.9, width: 3 })
                        draw.text(names[keys[i]]).move(x, y-10)
                    }
                })
                
            })

        })

    },
    created () {
        this.group = this.$route.params.group
        this.name = this.$route.params.name
        this.items_string = this.$route.params.items
    }


}
</script>

<style scoped>

.navbar {
  background-color: #FDB849;
  height: 60px;
  position: fixed;
  overflow: hidden;
  width: 100%;
  top: 0;
}

.navbar-menu {
  margin-right: 0px !important;
  margin-left: 0px;
}

.navbar-start {
  padding-left: 12px;
}

.navbar-end {
  padding-right: 10px;
}
</style>