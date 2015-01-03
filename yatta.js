!function e(t,n,r){function i(u,s){if(!n[u]){if(!t[u]){var p="function"==typeof require&&require;if(!s&&p)return p(u,!0);if(o)return o(u,!0);throw new Error("Cannot find module '"+u+"'")}var l=n[u]={exports:{}};t[u][0].call(l.exports,function(e){var n=t[u][1][e];return i(n?n:e)},l,l.exports,e,t,n,r)}return n[u].exports}for(var o="function"==typeof require&&require,u=0;u<r.length;u++)i(r[u]);return i}({1:[function(e,t){var n;n=function(e,t,n,r){var i,o,u,s;return s=function(t){return t.uid.creator===n.getUserId()&&"string"!=typeof t.uid.op_number?e.broadcast(t):void 0},r.push(s),u=function(){return n.getOperationCounter()},o=function(e){return n._encode(e)},i=function(e){return t.applyOpsCheckDouble(e)},e.whenSyncing(u,o,i),e.whenReceiving(function(e,r){return r.uid.creator!==n.getUserId()?t.applyOp(r):void 0})},t.exports=n},{}],2:[function(e,t){var n;"undefined"!=typeof window&&null!==window&&(window.unprocessed_counter=0),"undefined"!=typeof window&&null!==window&&(window.unprocessed_exec_counter=0),"undefined"!=typeof window&&null!==window&&(window.unprocessed_types=[]),n=function(){function e(e,t){this.HB=e,this.parser=t,this.unprocessed_ops=[]}return e.prototype.parseOperation=function(e){var t;if(t=this.parser[e.type],null!=t)return t(e);throw new Error("You forgot to specify a parser for type "+e.type+". The message is "+JSON.stringify(e)+".")},e.prototype.applyOpsBundle=function(e){var t,n,r,i,o,u;for(n=[],r=0,o=e.length;o>r;r++)t=e[r],n.push(this.parseOperation(t));for(i=0,u=n.length;u>i;i++)t=n[i],t.execute()||this.unprocessed_ops.push(t);return this.tryUnprocessed()},e.prototype.applyOpsCheckDouble=function(e){var t,n,r,i;for(i=[],n=0,r=e.length;r>n;n++)t=e[n],null==this.HB.getOperation(t.uid)?i.push(this.applyOp(t)):i.push(void 0);return i},e.prototype.applyOps=function(e){var t,n,r,i;for(i=[],n=0,r=e.length;r>n;n++)t=e[n],i.push(this.applyOp(t));return i},e.prototype.applyOp=function(e){var t;return t=this.parseOperation(e),this.HB.addToCounter(t),null!=this.HB.getOperation(t)||t.execute()||(this.unprocessed_ops.push(t),"undefined"!=typeof window&&null!==window&&window.unprocessed_counter++,"undefined"!=typeof window&&null!==window&&window.unprocessed_types.push(t.type)),this.tryUnprocessed()},e.prototype.tryUnprocessed=function(){var e,t,n,r,i,o,u;for(u=[];;){for("undefined"!=typeof window&&null!==window&&window.unprocessed_exec_counter++,e=this.unprocessed_ops.length,n=[],o=this.unprocessed_ops,r=0,i=o.length;i>r;r++)t=o[r],null!=this.HB.getOperation(t)||t.execute()||n.push(t);if(this.unprocessed_ops=n,this.unprocessed_ops.length===e)break;u.push(void 0)}return u},e}(),t.exports=n},{}],3:[function(e,t){var n,r=function(e,t){return function(){return e.apply(t,arguments)}};n=function(){function e(e){this.user_id=e,this.emptyGarbage=r(this.emptyGarbage,this),this.operation_counter={},this.buffer={},this.change_listeners=[],this.garbage=[],this.trash=[],this.performGarbageCollection=!0,this.garbageCollectTimeout=1e3,this.reserved_identifier_counter=0,setTimeout(this.emptyGarbage,this.garbageCollectTimeout)}return e.prototype.resetUserId=function(e){var t,n,r,i;if(n=this.buffer[this.user_id],null!=n)for(r=0,i=n.length;i>r;r++)t=n[r],t.uid.creator=e;return this.operation_counter[e]=this.operation_counter[this.user_id],delete this.operation_counter[this.user_id],this.user_id=e},e.prototype.emptyGarbage=function(){var e,t,n,r;for(r=this.garbage,t=0,n=r.length;n>t;t++)e=r[t],"function"==typeof e.cleanup&&e.cleanup();return this.garbage=this.trash,this.trash=[],-1!==this.garbageCollectTimeout&&(this.garbageCollectTimeoutId=setTimeout(this.emptyGarbage,this.garbageCollectTimeout)),void 0},e.prototype.getUserId=function(){return this.user_id},e.prototype.addToGarbageCollector=function(){var e,t,n,r;if(this.performGarbageCollection){for(r=[],t=0,n=arguments.length;n>t;t++)e=arguments[t],null!=e?r.push(this.garbage.push(e)):r.push(void 0);return r}},e.prototype.stopGarbageCollection=function(){return this.performGarbageCollection=!1,this.setManualGarbageCollect(),this.garbage=[],this.trash=[]},e.prototype.setManualGarbageCollect=function(){return this.garbageCollectTimeout=-1,clearTimeout(this.garbageCollectTimeoutId),this.garbageCollectTimeoutId=void 0},e.prototype.setGarbageCollectTimeout=function(e){this.garbageCollectTimeout=e},e.prototype.getReservedUniqueIdentifier=function(){return{creator:"_",op_number:"_"+this.reserved_identifier_counter++,doSync:!1}},e.prototype.getOperationCounter=function(e){var t,n,r,i;if(null==e){n={},i=this.operation_counter;for(r in i)t=i[r],n[r]=t;return n}return this.operation_counter[e]},e.prototype._encode=function(e){var t,n,r,i,o,u,s,p,l,a;null==e&&(e={}),t=[],p=function(t,n){if(null==t||null==n)throw new Error("dah!");return null==e[t]||e[t]<=n},a=this.buffer;for(s in a){l=a[s];for(o in l)if(n=l[o],n.uid.doSync&&p(s,o)){if(r=n._encode(),null!=n.next_cl){for(i=n.next_cl;null!=i.next_cl&&p(i.uid.creator,i.uid.op_number);)i=i.next_cl;r.next=i.getUid()}else if(null!=n.prev_cl){for(u=n.prev_cl;null!=u.prev_cl&&p(u.uid.creator,u.uid.op_number);)u=u.prev_cl;r.prev=u.getUid()}t.push(r)}}return t},e.prototype.getNextOperationIdentifier=function(e){var t;return null==e&&(e=this.user_id),null==this.operation_counter[e]&&(this.operation_counter[e]=0),t={creator:e,op_number:this.operation_counter[e],doSync:!0},this.operation_counter[e]++,t},e.prototype.getOperation=function(e){var t;return null!=e.uid&&(e=e.uid),null!=(t=this.buffer[e.creator])?t[e.op_number]:void 0},e.prototype.addOperation=function(e){if(null==this.buffer[e.uid.creator]&&(this.buffer[e.uid.creator]={}),null!=this.buffer[e.uid.creator][e.uid.op_number])throw new Error("You must not overwrite operations!");return this.buffer[e.uid.creator][e.uid.op_number]=e,null==this.number_of_operations_added_to_HB&&(this.number_of_operations_added_to_HB=0),this.number_of_operations_added_to_HB++,e},e.prototype.removeOperation=function(e){var t;return null!=(t=this.buffer[e.uid.creator])?delete t[e.uid.op_number]:void 0},e.prototype.addToCounter=function(e){var t;if(null==this.operation_counter[e.uid.creator]&&(this.operation_counter[e.uid.creator]=0),"number"==typeof e.uid.op_number&&e.uid.creator!==this.getUserId()&&e.uid.op_number===this.operation_counter[e.uid.creator]){for(this.operation_counter[e.uid.creator]++,t=[];null!=this.getOperation({creator:e.uid.creator,op_number:this.operation_counter[e.uid.creator]});)t.push(this.operation_counter[e.uid.creator]++);return t}},e}(),t.exports=n},{}],4:[function(e,t){var n=[].slice,r={}.hasOwnProperty,i=function(e,t){function n(){this.constructor=e}for(var i in t)r.call(t,i)&&(e[i]=t[i]);return n.prototype=t.prototype,e.prototype=new n,e.__super__=t.prototype,e};t.exports=function(e){var t,r,o,u,s,p,l;return l={},p=[],s=function(){function t(e){this.is_deleted=!1,this.garbage_collected=!1,this.event_listeners=[],null!=e&&(this.uid=e)}return t.prototype.type="Insert",t.prototype.observe=function(e){return this.event_listeners.push(e)},t.prototype.unobserve=function(e){return this.event_listeners=this.event_listeners.filter(function(t){return e!==t})},t.prototype.deleteAllObservers=function(){return this.event_listeners=[]},t.prototype.callEvent=function(){return this.forwardEvent.apply(this,[this].concat(n.call(arguments)))},t.prototype.forwardEvent=function(){var e,t,r,i,o,u,s;for(r=arguments[0],e=2<=arguments.length?n.call(arguments,1):[],u=this.event_listeners,s=[],i=0,o=u.length;o>i;i++)t=u[i],s.push(t.call.apply(t,[r].concat(n.call(e))));return s},t.prototype.isDeleted=function(){return this.is_deleted},t.prototype.applyDelete=function(t){return null==t&&(t=!0),!this.garbage_collected&&(this.is_deleted=!0,t)?(this.garbage_collected=!0,e.addToGarbageCollector(this)):void 0},t.prototype.cleanup=function(){return e.removeOperation(this),this.deleteAllObservers()},t.prototype.setParent=function(e){this.parent=e},t.prototype.getParent=function(){return this.parent},t.prototype.getUid=function(){return this.uid},t.prototype.dontSync=function(){return this.uid.doSync=!1},t.prototype.execute=function(){var t,n,r;for(this.is_executed=!0,null==this.uid&&(this.uid=e.getNextOperationIdentifier()),e.addOperation(this),n=0,r=p.length;r>n;n++)t=p[n],t(this._encode());return this},t.prototype.saveOperation=function(e,t){return null!=(null!=t?t.execute:void 0)?this[e]=t:null!=t?(null==this.unchecked&&(this.unchecked={}),this.unchecked[e]=t):void 0},t.prototype.validateSavedOperations=function(){var t,n,r,i,o,u;o={},i=this,u=this.unchecked;for(t in u)r=u[t],n=e.getOperation(r),n?this[t]=n:(o[t]=r,i=!1);return delete this.unchecked,i||(this.unchecked=o),i},t}(),t=function(e){function t(e,n){this.saveOperation("deletes",n),t.__super__.constructor.call(this,e)}return i(t,e),t.prototype.type="Delete",t.prototype._encode=function(){return{type:"Delete",uid:this.getUid(),deletes:this.deletes.getUid()}},t.prototype.execute=function(){var e;return this.validateSavedOperations()?(e=t.__super__.execute.apply(this,arguments),e&&this.deletes.applyDelete(this),e):!1},t}(s),l.Delete=function(e){var n,r;return r=e.uid,n=e.deletes,new t(r,n)},u=function(e){function t(e,n,r,i){this.saveOperation("prev_cl",n),this.saveOperation("next_cl",r),null!=i?this.saveOperation("origin",i):this.saveOperation("origin",n),t.__super__.constructor.call(this,e)}return i(t,e),t.prototype.type="Insert",t.prototype.applyDelete=function(e){var n,r,i;return null==this.deleted_by&&(this.deleted_by=[]),n=!1,null==this.parent||this.isDeleted()||null==e||(n=!0),null!=e&&this.deleted_by.push(e),r=!1,(null==this.prev_cl||null==this.next_cl||this.prev_cl.isDeleted())&&(r=!0),t.__super__.applyDelete.call(this,r),n&&this.callOperationSpecificDeleteEvents(e),(null!=(i=this.next_cl)?i.isDeleted():void 0)?this.next_cl.applyDelete():void 0},t.prototype.cleanup=function(){var e,n,r,i,o,u;if(null!=(o=this.prev_cl)?o.isDeleted():void 0){for(u=this.deleted_by,r=0,i=u.length;i>r;r++)e=u[r],e.cleanup();for(n=this.next_cl;"Delimiter"!==n.type;)n.origin===this&&(n.origin=this.prev_cl),n=n.next_cl;return this.prev_cl.next_cl=this.next_cl,this.next_cl.prev_cl=this.prev_cl,t.__super__.cleanup.apply(this,arguments)}},t.prototype.getDistanceToOrigin=function(){var e,t;for(e=0,t=this.prev_cl;;){if(this.origin===t)break;e++,t=t.prev_cl}return e},t.prototype.execute=function(){var e,n,r;if(this.validateSavedOperations()){if(null!=this.prev_cl){for(e=this.getDistanceToOrigin(),r=this.prev_cl.next_cl,n=e;;){if(r===this.next_cl)break;if(r.getDistanceToOrigin()===n)r.uid.creator<this.uid.creator&&(this.prev_cl=r,e=n+1);else{if(!(r.getDistanceToOrigin()<n))break;n-e<=r.getDistanceToOrigin()&&(this.prev_cl=r,e=n+1)}n++,r=r.next_cl}this.next_cl=this.prev_cl.next_cl,this.prev_cl.next_cl=this,this.next_cl.prev_cl=this}return this.setParent(this.prev_cl.getParent()),t.__super__.execute.apply(this,arguments),this.callOperationSpecificInsertEvents(),this}return!1},t.prototype.callOperationSpecificInsertEvents=function(){var e;return null!=(e=this.parent)?e.callEvent([{type:"insert",position:this.getPosition(),object:this.parent,changedBy:this.uid.creator,value:this.content}]):void 0},t.prototype.callOperationSpecificDeleteEvents=function(e){return this.parent.callEvent([{type:"delete",position:this.getPosition(),object:this.parent,length:1,changedBy:e.uid.creator}])},t.prototype.getPosition=function(){var e,t;for(e=0,t=this.prev_cl;;){if(t instanceof r)break;t.isDeleted()||e++,t=t.prev_cl}return e},t}(s),o=function(e){function t(e,n,r,i,o){this.content=n,t.__super__.constructor.call(this,e,r,i,o)}return i(t,e),t.prototype.type="ImmutableObject",t.prototype.val=function(){return this.content},t.prototype._encode=function(){var e;return e={type:"ImmutableObject",uid:this.getUid(),content:this.content},null!=this.prev_cl&&(e.prev=this.prev_cl.getUid()),null!=this.next_cl&&(e.next=this.next_cl.getUid()),null!=this.origin&&(e.origin=this.origin().getUid()),e},t}(s),l.ImmutableObject=function(e){var t,n,r,i,u;return u=e.uid,t=e.content,i=e.prev,n=e.next,r=e.origin,new o(u,t,i,n,r)},r=function(e){function t(e,n,r){this.saveOperation("prev_cl",n),this.saveOperation("next_cl",r),this.saveOperation("origin",n),t.__super__.constructor.call(this,e)}return i(t,e),t.prototype.type="Delimiter",t.prototype.applyDelete=function(){var e;for(t.__super__.applyDelete.call(this),e=this.next_cl;null!=e;)e.applyDelete(),e=e.next_cl;return void 0},t.prototype.cleanup=function(){return t.__super__.cleanup.call(this)},t.prototype.execute=function(){var e,n;if(null!=(null!=(e=this.unchecked)?e.next_cl:void 0))return t.__super__.execute.apply(this,arguments);if(null!=(n=this.unchecked)?n.prev_cl:void 0){if(this.validateSavedOperations()){if(null!=this.prev_cl.next_cl)throw new Error("Probably duplicated operations");return this.prev_cl.next_cl=this,t.__super__.execute.apply(this,arguments)}return!1}return null!=this.prev_cl&&null==this.prev_cl.next_cl?(delete this.prev_cl.unchecked.next_cl,this.prev_cl.next_cl=this,t.__super__.execute.apply(this,arguments)):t.__super__.execute.apply(this,arguments)},t.prototype._encode=function(){var e,t;return{type:"Delimiter",uid:this.getUid(),prev:null!=(e=this.prev_cl)?e.getUid():void 0,next:null!=(t=this.next_cl)?t.getUid():void 0}},t}(s),l.Delimiter=function(e){var t,n,i;return i=e.uid,n=e.prev,t=e.next,new r(i,n,t)},{types:{Delete:t,Insert:u,Delimiter:r,Operation:s,ImmutableObject:o},parser:l,execution_listener:p}}},{}],5:[function(e,t){var n,r={}.hasOwnProperty,i=function(e,t){function n(){this.constructor=e}for(var i in t)r.call(t,i)&&(e[i]=t[i]);return n.prototype=t.prototype,e.prototype=new n,e.__super__=t.prototype,e};n=e("./TextTypes"),t.exports=function(e){var t,r,o,u,s;return u=n(e),s=u.types,o=u.parser,r=function(e){var n;return n=function(){function e(n){var i,o,u,p;p=n.map,u=function(i,o){return Object.defineProperty(e.prototype,i,{get:function(){var e;return e=o.val(),e instanceof t?r(e):e instanceof s.ImmutableObject?e.val():e},set:function(e){var t,r,o,u;if(o=n.val(i),e.constructor==={}.constructor&&o instanceof s.Operation){u=[];for(t in e)r=e[t],u.push(o.val(t,r,"immutable"));return u}return n.val(i,e,"immutable")},enumerable:!0,configurable:!1})};for(i in p)o=p[i],u(i,o)}return e}(),new n(e)},t=function(t){function n(){return n.__super__.constructor.apply(this,arguments)}return i(n,t),n.prototype.type="JsonType",n.prototype.applyDelete=function(){return n.__super__.applyDelete.call(this)},n.prototype.cleanup=function(){return n.__super__.cleanup.call(this)},n.prototype.toJson=function(){var t,n,r,i,o;o=this.val(),t={};for(n in o)if(r=o[n],null==r)t[n]=r;else if(r.constructor==={}.constructor)t[n]=this.val(n).toJson();else if(r instanceof s.Operation){for(;r instanceof s.Operation;)r=r.val();t[n]=r}else t[n]=r;return this.bound_json=t,null!=Object.observe&&(i=this,Object.observe(this.bound_json,function(e){var t,n,r,o;for(o=[],n=0,r=e.length;r>n;n++)t=e[n],null!=t.changedBy||"add"!==t.type&&!(t.type="update")?o.push(void 0):o.push(i.val(t.name,t.object[t.name]));return o}),this.observe(function(t){var n,r,o,u,s,p;for(p=[],u=0,s=t.length;s>u;u++)n=t[u],n.created_!==e.getUserId()?(r=Object.getNotifier(i.bound_json),o=i.bound_json[n.name],null!=o?(r.performChange("update",function(){return i.bound_json[n.name]=i.val(n.name)},i.bound_json),p.push(r.notify({object:i.bound_json,type:"update",name:n.name,oldValue:o,changedBy:n.changedBy}))):(r.performChange("add",function(){return i.bound_json[n.name]=i.val(n.name)},i.bound_json),p.push(r.notify({object:i.bound_json,type:"add",name:n.name,oldValue:o,changedBy:n.changedBy})))):p.push(void 0);return p})),this.bound_json},n.prototype.mutable_default=!0,n.prototype.setMutableDefault=function(e){if(e===!0||"mutable"===e)n.prototype.mutable_default=!0;else{if(e!==!1&&"immutable"!==e)throw new Error('Set mutable either "mutable" or "immutable"!');n.prototype.mutable_default=!1}return"OK"},n.prototype.val=function(e,t,r){var i,o,u,p;if(null!=e&&arguments.length>1){if(r=null!=r?r===!0||"mutable"===r?!0:!1:this.mutable_default,"function"==typeof t)return this;if(null!=t&&(r&&"number"!=typeof t||t.constructor===Object)){if("string"==typeof t)return p=new s.WordType(void 0).execute(),p.insertText(0,t),n.__super__.val.call(this,e,p);if(t.constructor===Object){i=(new n).execute();for(o in t)u=t[o],i.val(o,u,r);return n.__super__.val.call(this,e,i)}throw new Error("You must not set "+typeof t+"-types in collaborative Json-objects!")}return n.__super__.val.call(this,e,new s.ImmutableObject(void 0,t).execute())}return n.__super__.val.call(this,e,t)},Object.defineProperty(n.prototype,"value",{get:function(){return r(this)},set:function(e){var t,n,r;if(e.constructor==={}.constructor){r=[];for(t in e)n=e[t],r.push(this.val(t,n,"immutable"));return r}throw new Error("You must only set Object values!")}}),n.prototype._encode=function(){return{type:"JsonType",uid:this.getUid()}},n}(s.MapManager),o.JsonType=function(e){var n;return n=e.uid,new t(n)},s.JsonType=t,u}},{"./TextTypes":7}],6:[function(e,t){var n,r={}.hasOwnProperty,i=function(e,t){function n(){this.constructor=e}for(var i in t)r.call(t,i)&&(e[i]=t[i]);return n.prototype=t.prototype,e.prototype=new n,e.__super__=t.prototype,e};n=e("./BasicTypes"),t.exports=function(e){var t,r,o,u,s,p,l,a;return p=n(e),a=p.types,l=p.parser,o=function(e){function n(e){this.map={},n.__super__.constructor.call(this,e)}return i(n,e),n.prototype.type="MapManager",n.prototype.applyDelete=function(){var e,t,r;r=this.map;for(e in r)t=r[e],t.applyDelete();return n.__super__.applyDelete.call(this)},n.prototype.cleanup=function(){return n.__super__.cleanup.call(this)},n.prototype.val=function(e,n){var r,i,o,u,s;if(null!=n)return null==this.map[e]&&new t(void 0,this,e).execute(),this.map[e].replace(n),this;if(null!=e)return o=this.map[e],null==o||o.isContentDeleted()?void 0:(i=o.val(),i instanceof a.ImmutableObject?i.val():i);u={},s=this.map;for(e in s)r=s[e],r.isContentDeleted()||(i=r.val(),i instanceof a.ImmutableObject&&(i=i.val()),u[e]=i);return u},n.prototype["delete"]=function(e){var t;return null!=(t=this.map[e])&&t.deleteContent(),this},n}(a.Operation),t=function(t){function n(e,t,r){this.name=r,this.saveOperation("map_manager",t),n.__super__.constructor.call(this,e)}return i(n,t),n.prototype.type="AddName",n.prototype.applyDelete=function(){return n.__super__.applyDelete.call(this)},n.prototype.cleanup=function(){return n.__super__.cleanup.call(this)},n.prototype.execute=function(){var t,r,i,o,s,p,l,c,h;return this.validateSavedOperations()?(r=function(e){var t,n,r;n={};for(t in e)r=e[t],n[t]=r;return n},c=r(this.map_manager.getUid()),c.doSync=!1,c.op_number="_"+c.op_number+"_RM_"+this.name,null==e.getOperation(c)&&(p=r(c),p.op_number=""+c.op_number+"_beginning",l=r(c),l.op_number=""+c.op_number+"_end",t=new a.Delimiter(p,void 0,l).execute(),i=new a.Delimiter(l,t,void 0).execute(),o={name:this.name},s=this.map_manager,this.map_manager.map[this.name]=new u(o,s,c,t,i),this.map_manager.map[this.name].setParent(this.map_manager,this.name),(null!=(h=this.map_manager.map[this.name]).add_name_ops?h.add_name_ops:h.add_name_ops=[]).push(this),this.map_manager.map[this.name].execute()),n.__super__.execute.apply(this,arguments)):!1},n.prototype._encode=function(){return{type:"AddName",uid:this.getUid(),map_manager:this.map_manager.getUid(),name:this.name}},n}(a.Operation),l.AddName=function(e){var n,r,i;return n=e.map_manager,i=e.uid,r=e.name,new t(i,n,r)},r=function(e){function t(e,n,r,i,o,u){null!=n&&null!=r?(this.saveOperation("beginning",n),this.saveOperation("end",r)):(this.beginning=new a.Delimiter(void 0,void 0,void 0),this.end=new a.Delimiter(void 0,this.beginning,void 0),this.beginning.next_cl=this.end,this.beginning.execute(),this.end.execute()),t.__super__.constructor.call(this,e,i,o,u)}return i(t,e),t.prototype.type="ListManager",t.prototype.execute=function(){return this.validateSavedOperations()?(this.beginning.setParent(this),this.end.setParent(this),t.__super__.execute.apply(this,arguments)):!1},t.prototype.getLastOperation=function(){return this.end.prev_cl},t.prototype.getFirstOperation=function(){return this.beginning.next_cl},t.prototype.toArray=function(){var e,t;for(e=this.beginning.next_cl,t=[];e!==this.end;)t.push(e),e=e.next_cl;return t},t.prototype.getOperationByPosition=function(e){var t;for(t=this.beginning;;){if(t instanceof a.Delimiter&&null!=t.prev_cl){for(t=t.prev_cl;t.isDeleted()||!(t instanceof a.Delimiter);)t=t.prev_cl;break}if(0>=e&&!t.isDeleted())break;t=t.next_cl,t.isDeleted()||(e-=1)}return t},t}(a.Operation),u=function(e){function t(e,n,r,i,o,u,s,p){this.event_properties=e,this.event_this=n,null==this.event_properties.object&&(this.event_properties.object=this.event_this),t.__super__.constructor.call(this,r,i,o,u,s,p)}return i(t,e),t.prototype.type="ReplaceManager",t.prototype.applyDelete=function(){var e,n,r,i;for(e=this.beginning;null!=e;)e.applyDelete(),e=e.next_cl;if(null!=this.add_name_ops)for(i=this.add_name_ops,n=0,r=i.length;r>n;n++)e=i[n],e.applyDelete();return t.__super__.applyDelete.call(this)},t.prototype.cleanup=function(){return t.__super__.cleanup.call(this)},t.prototype.callEventDecorator=function(e){var t,n,r,i,o,u;if(!this.isDeleted()){for(i=0,o=e.length;o>i;i++){t=e[i],u=this.event_properties;for(n in u)r=u[n],t[n]=r}this.event_this.callEvent(e)}return void 0},t.prototype.replace=function(e,t){var n,r;return n=this.getLastOperation(),r=new s(e,this,t,n,n.next_cl).execute(),void 0},t.prototype.isContentDeleted=function(){return this.getLastOperation().isDeleted()},t.prototype.deleteContent=function(){return new a.Delete(void 0,this.getLastOperation().uid).execute(),void 0},t.prototype.val=function(){var e;return e=this.getLastOperation(),"function"==typeof e.val?e.val():void 0},t.prototype._encode=function(){var e;return e={type:"ReplaceManager",uid:this.getUid(),beginning:this.beginning.getUid(),end:this.end.getUid()},null!=this.prev_cl&&null!=this.next_cl&&(e.prev=this.prev_cl.getUid(),e.next=this.next_cl.getUid()),null!=this.origin&&(e.origin=this.origin().getUid()),e},t}(r),l.ReplaceManager=function(e){var t,n,r,i,o,s;return s=e.uid,o=e.prev,r=e.next,i=e.origin,t=e.beginning,n=e.end,new u(s,t,n,o,r,i)},s=function(e){function t(e,n,r,i,o,u){if(this.saveOperation("content",e),this.saveOperation("parent",n),null==i||null==o)throw new Error("You must define prev, and next for Replaceable-types!");t.__super__.constructor.call(this,r,i,o,u)}return i(t,e),t.prototype.type="Replaceable",t.prototype.val=function(){return this.content},t.prototype.applyDelete=function(){var e;return e=t.__super__.applyDelete.apply(this,arguments),null!=this.content&&("Delimiter"!==this.next_cl.type&&this.content.deleteAllObservers(),this.content.applyDelete(),this.content.dontSync()),this.content=null,e},t.prototype.cleanup=function(){return t.__super__.cleanup.apply(this,arguments)},t.prototype.callOperationSpecificInsertEvents=function(){var e;return"Delimiter"===this.next_cl.type&&"Delimiter"!==this.prev_cl.type?(e=this.prev_cl.content,this.parent.callEventDecorator([{type:"update",changedBy:this.uid.creator,oldValue:e}]),this.prev_cl.applyDelete()):"Delimiter"!==this.next_cl.type?this.applyDelete():this.parent.callEventDecorator([{type:"add",changedBy:this.uid.creator}]),void 0},t.prototype.callOperationSpecificDeleteEvents=function(e){return"Delimiter"===this.next_cl.type?this.parent.callEventDecorator([{type:"delete",changedBy:e.uid.creator,oldValue:this.content}]):void 0},t.prototype._encode=function(){var e,t;return e={type:"Replaceable",content:null!=(t=this.content)?t.getUid():void 0,ReplaceManager:this.parent.getUid(),prev:this.prev_cl.getUid(),next:this.next_cl.getUid(),uid:this.getUid()},null!=this.origin&&this.origin!==this.prev_cl&&(e.origin=this.origin.getUid()),e},t}(a.Insert),l.Replaceable=function(e){var t,n,r,i,o,u;return t=e.content,i=e.ReplaceManager,u=e.uid,o=e.prev,n=e.next,r=e.origin,new s(t,i,u,o,n,r)},a.ListManager=r,a.MapManager=o,a.ReplaceManager=u,a.Replaceable=s,p}},{"./BasicTypes":4}],7:[function(e,t){var n,r={}.hasOwnProperty,i=function(e,t){function n(){this.constructor=e}for(var i in t)r.call(t,i)&&(e[i]=t[i]);return n.prototype=t.prototype,e.prototype=new n,e.__super__=t.prototype,e};n=e("./StructuredTypes"),t.exports=function(e){var t,r,o,u,s,p;return s=n(e),p=s.types,u=s.parser,t=function(e){function t(){return t.__super__.constructor.apply(this,arguments)}return i(t,e),t}(p.Delete),u.TextDelete=u.Delete,r=function(e){function t(e,n,r,i,o){var u;if((null!=e?null!=(u=e.uid)?u.creator:void 0:void 0)?this.saveOperation("content",e):this.content=e,null==r||null==i)throw new Error("You must define prev, and next for TextInsert-types!");t.__super__.constructor.call(this,n,r,i,o)}return i(t,e),t.prototype.type="TextInsert",t.prototype.getLength=function(){return this.isDeleted()?0:this.content.length},t.prototype.applyDelete=function(){return t.__super__.applyDelete.apply(this,arguments),this.content instanceof p.Operation&&this.content.applyDelete(),this.content=null},t.prototype.execute=function(){return this.validateSavedOperations()?(this.content instanceof p.Operation&&(this.content.insert_parent=this),t.__super__.execute.call(this)):!1},t.prototype.val=function(){return this.isDeleted()||null==this.content?"":this.content},t.prototype._encode=function(){var e,t;return e={type:"TextInsert",uid:this.getUid(),prev:this.prev_cl.getUid(),next:this.next_cl.getUid()},e.content=null!=(null!=(t=this.content)?t.getUid:void 0)?this.content.getUid():this.content,this.origin!==this.prev_cl&&(e.origin=this.origin.getUid()),e},t}(p.Insert),u.TextInsert=function(e){var t,n,i,o,u;return t=e.content,u=e.uid,o=e.prev,n=e.next,i=e.origin,new r(t,u,o,n,i)},o=function(e){function n(e,t,r,i,o,u){this.textfields=[],n.__super__.constructor.call(this,e,t,r,i,o,u)}return i(n,e),n.prototype.type="WordType",n.prototype.applyDelete=function(){var e,t,r,i,o;for(o=this.textfields,r=0,i=o.length;i>r;r++)t=o[r],t.onkeypress=null,t.onpaste=null,t.oncut=null;for(e=this.beginning;null!=e;)e.applyDelete(),e=e.next_cl;return n.__super__.applyDelete.call(this)},n.prototype.cleanup=function(){return n.__super__.cleanup.call(this)},n.prototype.push=function(e){return this.insertAfter(this.end.prev_cl,e)},n.prototype.insertAfter=function(e,t){for(var n,i,o,u,s;e.isDeleted();)e=e.prev_cl;if(i=e.next_cl,null!=t.type)new r(t,void 0,e,i).execute();else for(u=0,s=t.length;s>u;u++)n=t[u],o=new r(n,void 0,e,i).execute(),e=o;return this},n.prototype.insertText=function(e,t){var n;return n=this.getOperationByPosition(e),this.insertAfter(n,t)},n.prototype.deleteText=function(e,n){var r,i,o,u,s;for(u=this.getOperationByPosition(e+1),i=[],o=s=0;(n>=0?n>s:s>n)&&!(u instanceof p.Delimiter);o=n>=0?++s:--s){for(r=new t(void 0,u).execute(),u=u.next_cl;!(u instanceof p.Delimiter)&&u.isDeleted();)u=u.next_cl;i.push(r._encode())}return this},n.prototype.val=function(){var e,t;return e=function(){var e,n,r,i;for(r=this.toArray(),i=[],e=0,n=r.length;n>e;e++)t=r[e],null!=t.val?i.push(t.val()):i.push("");return i}.call(this),e.join("")},n.prototype.toString=function(){return this.val()},n.prototype.bind=function(e){var t;return t=this,e.value=this.val(),this.textfields.push(e),this.observe(function(n){var r,i,o,u,s,p,l,a;for(a=[],p=0,l=n.length;l>p;p++)r=n[p],"insert"===r.type?(u=r.position,i=function(e){return u>=e?e:e+=1},o=i(e.selectionStart),s=i(e.selectionEnd),e.value=t.val(),a.push(e.setSelectionRange(o,s))):"delete"===r.type?(u=r.position,i=function(e){return u>e?e:e-=1},o=i(e.selectionStart),s=i(e.selectionEnd),e.value=t.val(),a.push(e.setSelectionRange(o,s))):a.push(void 0);return a}),e.onkeypress=function(n){var r,i,o,u;return r=null,r=null!=n.key?32===n.charCode?" ":13===n.keyCode?"\n":n.key:String.fromCharCode(n.keyCode),r.length>0?(u=Math.min(e.selectionStart,e.selectionEnd),i=Math.abs(e.selectionEnd-e.selectionStart),t.deleteText(u,i),t.insertText(u,r),o=u+r.length,e.setSelectionRange(o,o),n.preventDefault()):n.preventDefault()},e.onpaste=function(e){return e.preventDefault()},e.oncut=function(e){return e.preventDefault()},e.onkeydown=function(n){var r,i,o,u,s;if(u=Math.min(e.selectionStart,e.selectionEnd),i=Math.abs(e.selectionEnd-e.selectionStart),null!=n.keyCode&&8===n.keyCode){if(i>0)t.deleteText(u,i),e.setSelectionRange(u,u);else if(null!=n.ctrlKey&&n.ctrlKey){for(s=e.value,o=u,r=0,u>0&&(o--,r++);o>0&&" "!==s[o]&&"\n"!==s[o];)o--,r++;t.deleteText(o,u-o),e.setSelectionRange(o,o)}else t.deleteText(u-1,1);return n.preventDefault()}return null!=n.keyCode&&46===n.keyCode?(i>0?(t.deleteText(u,i),e.setSelectionRange(u,u)):(t.deleteText(u,1),e.setSelectionRange(u,u)),n.preventDefault()):void 0}},n.prototype._encode=function(){var e;return e={type:"WordType",uid:this.getUid(),beginning:this.beginning.getUid(),end:this.end.getUid()},null!=this.prev_cl&&(e.prev=this.prev_cl.getUid()),null!=this.next_cl&&(e.next=this.next_cl.getUid()),null!=this.origin&&(e.origin=this.origin().getUid()),e},n}(p.ListManager),u.WordType=function(e){var t,n,r,i,u,s;return s=e.uid,t=e.beginning,n=e.end,u=e.prev,r=e.next,i=e.origin,new o(s,t,n,u,r,i)},p.TextInsert=r,p.TextDelete=t,p.WordType=o,s}},{"./StructuredTypes":6}],8:[function(e,t){var n,r,i,o,u,s={}.hasOwnProperty,p=function(e,t){function n(){this.constructor=e}for(var r in t)s.call(t,r)&&(e[r]=t[r]);return n.prototype=t.prototype,e.prototype=new n,e.__super__=t.prototype,e};u=e("./Types/JsonTypes"),r=e("./HistoryBuffer"),n=e("./Engine"),i=e("./ConnectorAdapter"),o=function(e){var t,o,s,l,a;return a=null,null!=e.id?a=e.id:(a="_temp",e.whenUserIdSet(function(e){return a=e,t.resetUserId(e)})),t=new r(a),s=u(t),l=s.types,o=function(r){function o(){this.connector=e,this.HB=t,this.types=l,this.engine=new n(this.HB,s.parser),i(this.connector,this.engine,this.HB,s.execution_listener),o.__super__.constructor.apply(this,arguments)}return p(o,r),o.prototype.getConnector=function(){return this.connector},o}(l.JsonType),new o(t.getReservedUniqueIdentifier()).execute()},t.exports=o,"undefined"!=typeof window&&null!==window&&null==window.Yatta&&(window.Yatta=o)},{"./ConnectorAdapter":1,"./Engine":2,"./HistoryBuffer":3,"./Types/JsonTypes":5}]},{},[8]);