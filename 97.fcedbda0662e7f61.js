"use strict";(self.webpackChunkembedika=self.webpackChunkembedika||[]).push([[97],{2097:(h,i,e)=>{e.r(i),e.d(i,{CarComponent:()=>O});var n=e(4650),o=e(6895),s=e(3456),p=e(4158),d=e(7531),r=e(1572),c=e(7392),g=e(4859),u=e(4850);function m(t,_){1&t&&n._UZ(0,"mat-spinner")}function f(t,_){if(1&t&&(n.TgZ(0,"div",14)(1,"label"),n._uU(2,"Standart: "),n.TgZ(3,"span"),n._uU(4),n.qZA()(),n.TgZ(5,"label"),n._uU(6,"Power: "),n.TgZ(7,"span"),n._uU(8),n.qZA()(),n.TgZ(9,"label"),n._uU(10,"Max-power: "),n.TgZ(11,"span"),n._uU(12),n.qZA()(),n.TgZ(13,"label"),n._uU(14,"Time to charge: "),n.TgZ(15,"span"),n._uU(16),n.qZA()(),n.TgZ(17,"label"),n._uU(18,"Speed to charge: "),n.TgZ(19,"span"),n._uU(20),n.qZA()()()),2&t){const a=_.$implicit;n.xp6(4),n.hij(" ",a.standard,""),n.xp6(4),n.hij(" ",a.power,""),n.xp6(4),n.hij(" ",a.max_electric_power,""),n.xp6(4),n.hij(" ",a.time,""),n.xp6(4),n.hij(" ",a.speed,"")}}function C(t,_){if(1&t){const a=n.EpF();n.TgZ(0,"div",4)(1,"nav",5)(2,"button",6),n.NdJ("click",function(){n.CHM(a);const T=n.oxw(2);return n.KtG(T.goBack())}),n.TgZ(3,"mat-icon"),n._uU(4,"arrow_back"),n.qZA(),n._uU(5," Go back "),n.qZA()(),n.TgZ(6,"h3"),n._uU(7),n.qZA(),n.TgZ(8,"div",7)(9,"div",8)(10,"label"),n._uU(11,"Model"),n.qZA(),n.TgZ(12,"div")(13,"span"),n._uU(14),n.qZA()()(),n.TgZ(15,"div",9)(16,"label"),n._uU(17,"Charge version"),n.qZA(),n.TgZ(18,"div")(19,"span"),n._uU(20),n.qZA()()()(),n.TgZ(21,"div",7)(22,"div",10)(23,"label"),n._uU(24,"Acceleration"),n.qZA(),n.TgZ(25,"div")(26,"span"),n._uU(27),n.qZA()()(),n.TgZ(28,"div",11)(29,"label"),n._uU(30,"Best range"),n.qZA(),n.TgZ(31,"div",12)(32,"label"),n._uU(33,"City: "),n.TgZ(34,"span"),n._uU(35),n.qZA()(),n.TgZ(36,"label"),n._uU(37,"Highway: "),n.TgZ(38,"span"),n._uU(39),n.qZA()(),n.TgZ(40,"label"),n._uU(41,"Combined: "),n.TgZ(42,"span"),n._uU(43),n.qZA()()()()(),n.TgZ(44,"label"),n._uU(45,"Connectors type:"),n.qZA(),n.YNc(46,f,21,5,"div",13),n.qZA()}if(2&t){const a=_.ngIf;n.xp6(7),n.Oqu(a.naming.make),n.xp6(7),n.Oqu(a.naming.model),n.xp6(6),n.Oqu(a.naming.chargetrip_version),n.xp6(7),n.Oqu(a.acceleration),n.xp6(8),n.hij(" ",a.range.best.city,", "),n.xp6(4),n.hij(" ",a.range.best.highway,", "),n.xp6(4),n.hij(" ",a.range.best.combined,""),n.xp6(3),n.Q6J("ngForOf",a.connectors)}}function Z(t,_){if(1&t&&(n.TgZ(0,"div",1),n.YNc(1,m,1,0,"mat-spinner",2),n.YNc(2,C,47,8,"div",3),n.qZA()),2&t){const a=_.ngIf;n.xp6(1),n.Q6J("ngIf",a.loading),n.xp6(1),n.Q6J("ngIf",null==a.data?null:a.data.car)}}const v=p.Ps`
  query GetCar($id: ID!) {
    car(id: $id) {
      id
      naming {
        make
        model
        chargetrip_version
      }
      acceleration
      range {
        best {
          highway
          city
          combined
        }
      }
      connectors {
        standard
        power
        time
        speed
        max_electric_power
      }
    }
  }
`;let O=(()=>{class t{constructor(){this.activatedRouter=(0,n.f3M)(s.gz),this.api=(0,n.f3M)(d.s)}ngOnInit(){const a=this.activatedRouter.snapshot.paramMap.get("id")??"";this.data$=this.api.request(v,{id:a})}goBack(){history.back()}}return t.\u0275fac=function(a){return new(a||t)},t.\u0275cmp=n.Xpm({type:t,selectors:[["app-car"]],standalone:!0,features:[n.jDz],decls:2,vars:3,consts:[["class","car",4,"ngIf"],[1,"car"],[4,"ngIf"],["class","container",4,"ngIf"],[1,"container"],[1,"car__navbar"],["mat-button","",2,"color","#2962FF",3,"click"],[1,"car__info"],[1,"car__info-model"],[1,"car__info-charge"],[1,"car__info-acceleration"],[1,"car__info-range"],[1,"car__info-rangeinfo"],["class","car__connectors",4,"ngFor","ngForOf"],[1,"car__connectors"]],template:function(a,l){1&a&&(n.YNc(0,Z,3,2,"div",0),n.ALo(1,"async")),2&a&&n.Q6J("ngIf",n.lcZ(1,1,l.data$))},dependencies:[o.O5,o.sg,o.Ov,r.Cq,r.Ou,g.ot,g.lW,c.Ps,c.Hw,u.t],styles:[".car[_ngcontent-%COMP%]{padding:52px 4%}.car[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%] > *[_ngcontent-%COMP%]{margin-bottom:30px}.car__info[_ngcontent-%COMP%]{display:flex;flex:1;flex-wrap:wrap}.car__info-model[_ngcontent-%COMP%], .car__info-charge[_ngcontent-%COMP%], .car__info-acceleration[_ngcontent-%COMP%], .car__info-range[_ngcontent-%COMP%]{display:flex;flex-basis:50%;padding-right:10px;flex-wrap:wrap}.car__info-rangeinfo[_ngcontent-%COMP%]   label[_ngcontent-%COMP%]{width:auto;margin:0}.car__connectors[_ngcontent-%COMP%]{display:flex;flex-direction:column;margin-left:20px}.car__connectors[_ngcontent-%COMP%]   label[_ngcontent-%COMP%]{width:auto;margin:0}span[_ngcontent-%COMP%]{font-weight:400;font-size:16px;line-height:24px;color:#2962ff}label[_ngcontent-%COMP%]{width:150px;margin-right:20%}"],changeDetection:0}),t})()}}]);