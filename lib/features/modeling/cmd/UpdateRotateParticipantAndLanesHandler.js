export default function UpdateRotateParticipantAndLanesHandler(elementRegistry, modeling) {
  self._elementRegistry = elementRegistry;
  self._modeling = modeling;
}

UpdateRotateParticipantAndLanesHandler.$inject = ['elementRegistry','modeling'];

UpdateRotateParticipantAndLanesHandler.prototype.preExecute = function(context) {
  var isHorizontal = context.isHorizontal;
  var element = context.element;
  element.isHorizontal = isHorizontal;
  element.width += (30 * (isHorizontal ? 1 : -1));
  element.height += (30 * (isHorizontal ? -1 : 1));
  element.di.bounds.width = element.width;
  element.di.bounds.height = element.height;
  self._modeling.updateProperties(element, {});
  //ToDo: Should be recursive?
  element.children.filter(x => x.type == 'bpmn:Lane' || x.type == 'bpmn:Participant')
    .forEach(function(lane) {
      var laneElement = self._elementRegistry.get(lane.id);
      laneElement.isHorizontal = isHorizontal;
      laneElement.x += (30 * (isHorizontal ? 1 : -1));
      laneElement.y += (30 * (isHorizontal ? -1 : 1));
      lane.di.isHorizontal = isHorizontal;
      lane.di.bounds.x += (30 * (isHorizontal ? 1 : -1));
      lane.di.bounds.y += (30 * (isHorizontal ? -1 : 1));
      self._modeling.updateProperties(laneElement, {});
    });
};