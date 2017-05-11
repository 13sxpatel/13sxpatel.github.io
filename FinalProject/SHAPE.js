var SHAPE = (function() {
   var my = {};

   function addMeshVertices(V, m, n, func) {
      function append(A) {
         for (let i = 0 ; i < A.length ; i++)
            V.push(A[i]);
      }
      for (let j = 0 ; j < n ; j++)
      for (let i = 0 ; i < m ; i++) {
         let A = func( i   /m,  j   /n),
	     B = func((i+1)/m,  j   /n),
             C = func( i   /m, (j+1)/n),
	     D = func((i+1)/m, (j+1)/n);
         append(A); append(B); append(D); // Lower right of square.
         append(D); append(C); append(A); // Upper left of square.
      }
      return V;
   }

   function addDisk(V, n, zSign, z) {
      function f(i) {
         let theta = zSign * 2 * Math.PI * i / n;

	 V.push(Math.cos(theta) ,Math.sin(theta),z, 0,0,zSign, 0,0);
      }
      for (let i = 0 ; i < n ; i++) {
         f(i  );
         f(i+1);
         V.push(0,0,z, z,0,zSign, 0,0);
      }
      return V;
   }

   function addSphere(V,n){
     return addMeshVertices(V, n, 1,function(u,v){
       let theta = 2 * Math.PI * u;
       let phi = Math.PI * (v -.5);
       c = Math.cos(theta) * Math.cos(phi);
       s = Math.sin(theta) * Math.cos(phi);
       z = Math.sin(phi);
       return [c,s,z, c,s,z, u,v];
     });
   }
   function addConeVertices(V, n) {
      return addMeshVertices(V, n, 1, function(u, v) {
         let theta = 2 * Math.PI * u;
         let phi =  Math.cos(Math.PI) + (v);
         let z     = Math.sin(phi)
         let c     = Math.cos(theta)*Math.sin(phi);
         let s     = Math.sin(theta)*Math.sin(phi) ;
         return [c,s,z, c,s,0, u,v];
      });
   }
   function addTubeVertices(V, n) {
      return addMeshVertices(V, n, 1, function(u, v) {
         let theta = 2 * Math.PI * u;
         let z     = 2 * v - 1;
         let c     = Math.cos(theta);
         let s     = Math.sin(theta);
         return [c,s,z, c,s,0, u,v];
      });
   }

   function addBody(V, n) {
      return addMeshVertices(V, n, 1, function(u, v) {
         let theta = 2 * Math.PI * u;
         let phi =  Math.cos(Math.PI) + (v + .5);
         let z     = Math.sin(phi)
         let c     = Math.cos(theta)*Math.sin(phi);
         let s     = Math.sin(theta)*Math.sin(phi) ;
         return [c,s,z, c,s,0, u,v];
      });
   }

   function addHalo(V, n) {
      return addMeshVertices(V, n, 1, function(u, v) {
         let theta = 2 * Math.PI * u;
         let phi =  Math.cos(Math.PI) + (v -1.2);
         let z     = Math.sin(phi)
         let c     = Math.cos(theta)*Math.sin(phi);
         let s     = Math.sin(theta)*Math.sin(phi) ;
         return [c,s,z, c,s,0, u,v];
      });
   }
   my.cone = function(n) {
      var V = [];
      //addDiskVertices(V, n, -1, -1);
      addConeVertices(V, n);
      //addDiskVertices(V, n,  1,  1);
      return V;
   }

   my.tube = function(n) {
      var V = [];

      addTubeVertices(V,n);

      return V;
   }

   my.body = function(n){
     var V = [];
     addBody(V, n)
     return V;
   }

   my.halo = function(n){
     var V = [];
     addHalo(V, n)
     return V;
   }

   my.disk = function(n){
     var V = [];
     addDisk(V, n, 1, 1)
     return V;
   }

   return my;
})();
