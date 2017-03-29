Template.polls.onCreated(function helloOnCreated()
{
	this.increment1 = new ReactiveVar(34);
	this.increment2 = new ReactiveVar(50);
	this.increment3 = new ReactiveVar(41);
	this.increment4 = new ReactiveVar(14);
	this.increment5 = new ReactiveVar(12);
	this.increment6 = new ReactiveVar(69);
	this.increment7 = new ReactiveVar(4);
	this.increment8 = new ReactiveVar(13);
	this.increment9 = new ReactiveVar(10);
	this.increment10 = new ReactiveVar(7);
	total = 75;
	percentage = [0,0,0,0,0,0,0,0,0,0];
	x = [1,1,1,1,1,1,1,1,1,1];	
});

Template.polls.helpers(
{
  increment1()
  {
    return Template.instance().increment1.get();
  },
  increment2()
  {
	Meteor.call('likePoll', this._id);
    return Template.instance().increment2.get();
  },
  increment3()
  {
    return Template.instance().increment3.get();
  },
  increment4()
  {
    return Template.instance().increment4.get();
  },
  increment5()
  {
    return Template.instance().increment5.get();
  },
  increment6()
  {
    return Template.instance().increment6.get();
  },
  increment7()
  {
    return Template.instance().increment7.get();
  },
  increment8()
  {
    return Template.instance().increment8.get();
  },
  increment9()
  {
    return Template.instance().increment9.get();
  },
  increment10()
  {
    return Template.instance().increment10.get();
  },
});

Template.polls.events(
{	
  'click .bt1'(event, instance)
  {
    instance.increment1.set(instance.increment1.get() + x[0]);
	total += x[0];
	x[0] *=-1;
  },

  'click .bt2'(event, instance)
  {
    instance.increment2.set(instance.increment2.get() + x[1]);
	total += x[1];
	x[1] *=-1;
  },
  'click .bt3'(event, instance)
  {
    instance.increment3.set(instance.increment3.get() + x[2]);
	total += x[2];
	x[2] *=-1;
  },
  'click .bt4'(event, instance)
  {
    instance.increment4.set(instance.increment4.get() + x[3]);
	total += x[3];
	x[3] *=-1;
  },
  'click .bt5'(event, instance)
  {
    instance.increment5.set(instance.increment5.get() + x[4]);
	total += x[4];
	x[4] *=-1;
  },
  'click .bt6'(event, instance)
  {
    instance.increment6.set(instance.increment6.get() + x[5]);
	total += x[5];
	x[5] *=-1;
  },
  'click .bt7'(event, instance)
  {
    instance.increment7.set(instance.increment7.get() + x[6]);
	total += x[6];
	x[6] *=-1;
  },
  'click .bt8'(event, instance)
  {
    instance.increment8.set(instance.increment8.get() + x[7]);
	total += x[7];
	x[7] *=-1;
  },
  'click .bt9'(event, instance)
  {
    instance.increment9.set(instance.increment9.get() + x[8]);
	total += x[8];
	x[8] *=-1;
  },
   'click .bt10'(event, instance)
  {
    instance.increment10.set(instance.increment10.get() + x[9]);
	total += x[9];
	x[9] *=-1;
  },
  'click .button'(event, instance)
  {
	percentage[0] = (instance.increment1.get()/total)*100;
	document.getElementById("percent1").style = "width:"+percentage[0]+"%";
	percentage[1] = (instance.increment2.get()/total)*100;
	document.getElementById("percent2").style = "width:"+percentage[1]+"%";
	percentage[2] = (instance.increment3.get()/total)*100;	
	document.getElementById("percent3").style = "width:"+percentage[2]+"%";
	percentage[3] = (instance.increment4.get()/total)*100;
	document.getElementById("percent4").style = "width:"+percentage[3]+"%";
	percentage[4] = (instance.increment5.get()/total)*100;
	document.getElementById("percent5").style = "width:"+percentage[4]+"%";
	percentage[5] = (instance.increment6.get()/total)*100;
	document.getElementById("percent6").style = "width:"+percentage[5]+"%";
	percentage[6] = (instance.increment7.get()/total)*100;
	document.getElementById("percent7").style = "width:"+percentage[6]+"%";
	percentage[7] = (instance.increment8.get()/total)*100;
	document.getElementById("percent8").style = "width:"+percentage[7]+"%";
	percentage[8] = (instance.increment9.get()/total)*100;
	document.getElementById("percent9").style = "width:"+percentage[8]+"%";	
	percentage[9] = (instance.increment10.get()/total)*100;
	document.getElementById("percent10").style = "width:"+percentage[9]+"%";  
  },
});
